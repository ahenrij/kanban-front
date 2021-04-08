import ApiService from './api.service'
import { TokenService, StorageService } from './storage.service'

class AuthError extends Error {
    constructor(errorCode, message) {
        super(message)
        this.name = this.constructor.name
        this.message = message
        this.errorCode = errorCode
    }
}

const LOGIN_URI = '/api/login'
const TOKEN_URI = '/api/token'
const REGISTER_URI = '/api/register'

const AuthService = {
    /**
     * Login the user and store the access token to localStorage via TokenService. 
     * 
     * @returns access_token
     * @throws AuthError 
    **/
    async login(email, password) {
        
        try {
            const response = await ApiService.post(LOGIN_URI, {email, password})
            
            const token = response.data.accessToken
            TokenService.saveToken(token)

            //Save user's informations
            let user = JSON.parse(JSON.stringify(response.data))
            delete user.accessToken

            StorageService.saveUser(user)
            ApiService.setHeader()
            ApiService.mount401Interceptor()

            return token
        } catch (error) {
            throw new AuthError(error.response.status, error.response.data.message)
        }
    },

    /**
     * Register a new user
     * 
     * @param user, Object representation of the new user
     * @returns true if registered, false else.
     * @throws AuthError
     */
    async register(user) {

        try {
            const response = await ApiService.post(REGISTER_URI, user)

            if (response.status == 200) {
                return true
            } else if (response.data.includes('SQLIntegrityConstraintViolationException')) {
                throw new AuthError(response.status, 'Adresse email déjà utilisée.')
            } else {
                console.log(response)
                throw AuthError(response.status, 'Oops ! Une erreur est survenue !')
            }

        } catch (error) {
            throw new AuthError(error.response.status, error.response.data.message)
        }
    },

    /**
     * Refresh the access token.
    **/ 
    async refreshToken() {

        try {
            const response = await ApiService.get(TOKEN_URI)

            const token = response.data.accessToken
            TokenService.saveToken(token)
            // Update the header in ApiService
            ApiService.setHeader()
            return token
        } catch (error) {
            throw new AuthError(error.response.status, error.response.data.message)
        }
    },

    /**
     * Logout the current user by removing the token from storage. 
     * 
     * Will also remove `Authorization Bearer <token>` header from future requests.
    **/
    logout() {
        // Remove the token and remove Authorization header from Api Service as well 
        TokenService.removeToken()
        ApiService.removeHeader()
        
        // NOTE: Again, we'll cover the 401 Interceptor a bit later. 
        ApiService.unmount401Interceptor()
    }
}

export function isLoggedIn() {
    return TokenService.getToken() !== null
}

export default AuthService

export { AuthService, AuthError }