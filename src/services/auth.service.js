import ApiService from './api.service'
import { TokenService, StorageService } from './storage.service'

class AuthenticationError extends Error {
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
     * @throws AuthenticationError 
    **/
    login: async function(email, password) {
        
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
            throw new AuthenticationError(error.response.status, error.response.data.message)
        }
    },

    /**
     * Refresh the access token.
    **/ 
    refreshToken: async function() {

        try {
            const response = await ApiService.get(TOKEN_URI)

            const token = response.data.accessToken
            TokenService.saveToken(token)
            TokenService.saveRefreshToken(token)
            // Update the header in ApiService
            ApiService.setHeader()
            return token
        } catch (error) {
            throw new AuthenticationError(error.response.status, error.response.data.message)
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
        TokenService.removeRefreshToken()
        ApiService.removeHeader()
        
        // NOTE: Again, we'll cover the 401 Interceptor a bit later. 
        ApiService.unmount401Interceptor()
        window.location.reload()
    }
}

export function isLoggedIn() {
        return TokenService.getToken() !== null
}

export default AuthService

export { AuthService, AuthenticationError }