const TOKEN_KEY = 'access_token'
const USER_KEY = 'loggedin_user'

/**
 * Manage the how Access Tokens are being stored and retreived from storage.
 *
 * Current implementation stores to localStorage. Local Storage should always be
 * accessed through this instance.
**/
const TokenService = {

    getToken() {
        return localStorage.getItem(TOKEN_KEY)
    },

    saveToken(accessToken) {
        localStorage.setItem(TOKEN_KEY, accessToken)
    },

    removeToken() {
        localStorage.removeItem(TOKEN_KEY)
    },
}

const StorageService = {

    getUser() {
        return JSON.parse(localStorage.getItem(USER_KEY))
    },

    saveUser(user) {
        localStorage.setItem(USER_KEY, JSON.stringify(user))
    },

    removeUser() {
        localStorage.removeItem(USER_KEY)
    }
}

export default TokenService

export { TokenService, StorageService }