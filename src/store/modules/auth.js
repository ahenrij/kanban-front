import { AuthService, AuthError } from '../../services/auth.service'
import { TokenService, StorageService } from '../../services/storage.service'
import router from '../../router'

const state = {
    authenticating: false,
    accessToken: TokenService.getToken(),
    authenticationErrorCode: 0,
    authenticationError: '',
    refreshTokenPromise: null  // Holds the promise of the refresh token
}

const getters = {
    loggedIn: (state) => {
        return state.accessToken ? true : false
    },

    authErrorCode: (state) => {
        return state.authenticationErrorCode
    },

    authError: (state) => {
        return state.authenticationError
    },

    authenticating: (state) => {
        return state.authenticating
    }
}

const actions = {

    async login({ commit }, { email, password }) {

        commit('loginRequest');
        try {
            const token = await AuthService.login(email, password);
            var user = StorageService.getUser()

            //update store with fresh logged in user infos
            commit('data/mutate', { property: 'user', with: user }, { root: true })
            commit('loginSuccess', token)

            // Redirect the user to the page he first tried to visit or to the home view
            if (router.history.current.query.redirect != '/logout') {
                router.push(router.history.current.query.redirect || '/');
            } else {
                router.push('/');
            }

            //window.location.reload()
            return true

        } catch (e) {
            if (e instanceof AuthError) {
                //console.log(e.message)
                commit('loginError', { errorCode: e.errorCode, errorMessage: e.message })
            }
            return false
        }
    },

    logout({ commit }) {
        UserService.logout()
        commit('logoutSuccess')
        router.push('/')
    },

    refreshToken({ commit, state }) {
        // If this is the first time the refreshToken has been called, make a request
        // otherwise return the same promise to the caller
        if (!state.refreshTokenPromise) {
            const p = UserService.refreshToken()
            commit('refreshTokenPromise', p)

            // Wait for the UserService.refreshToken() to resolve. On success set the token and clear promise
            // Clear the promise on error as well.
            p.then(
                response => {
                    commit('refreshTokenPromise', null)
                    commit('loginSuccess', response)
                },
                // eslint-disable-next-line no-unused-vars
                _error => {
                    commit('refreshTokenPromise', null)
                }
            )
        }

        return state.refreshTokenPromise
    }
}

const mutations = {
    loginRequest(state) {
        state.authenticating = true;
        state.authenticationError = ''
        state.authenticationErrorCode = 0
    },

    loginSuccess(state, accessToken) {
        state.accessToken = accessToken
        state.authenticating = false;
    },

    loginError(state, { errorCode, errorMessage }) {
        state.authenticating = false
        state.authenticationErrorCode = errorCode
        state.authenticationError = errorMessage
    },

    logoutSuccess(state) {
        state.accessToken = null
    },

    refreshTokenPromise(state, promise) {
        state.refreshTokenPromise = promise
    }
}

export const auth = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}

export default auth