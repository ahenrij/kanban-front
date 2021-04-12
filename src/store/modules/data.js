import { ReqService, ReqError } from '../../services/req.service'

const state = {
    loading: false,
    loadingErrorCode: '',
    loadingError: '',
    boards: [],
    user: null,
}

const getters = {
    get: (state) => (property) => {
        return state[property]
    },
    loading: (state) => {
        return state.loading
    }
}

const actions = {
    /**
     * Make request to API.
     * 
     * @returns api response
     * @throws ReqError 
    **/
    async makeRequest({ commit }, payload) {

        commit('loadingRequest');
        try {
            const response = await ReqService.makeRequest(payload.requestData);
            //console.log(response);
            commit('loadingSuccess');
            if (payload.commit) {
                commit('mutate', {
                    property: payload.stateProperty,
                    with: response.data
                });
            }
            return response;
        } catch (e) {
            if (e instanceof ReqError) {
                commit('loadingError', { errorCode: e.errorCode, errorMessage: e.message })
            } else {
                commit('loadingError', { errorCode: 501, errorMessage: 'Connexion au serveur impossible' })
            }
            return false
        }
    },

    setData({ commit }, { stateProperty, value }) {
        commit('mutate', {
            property: stateProperty,
            with: value
        });
    }
}

const mutations = {

    loadingRequest(state) {
        state.loading = true;
        state.loadingError = ''
        state.loadingError = 0
    },

    loadingSuccess(state) {
        state.loading = false;
    },

    loadingError(state, { errorCode, errorMessage }) {
        state.loading = false
        state.loadingErrorCode = errorCode
        state.loadingError = errorMessage
    },

    mutate(state, payload) {
        state[payload.property] = payload.with;
    }
};

export const data = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}

export default data