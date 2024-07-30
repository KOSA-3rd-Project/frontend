import axios from 'axios';

const initialState = {
    searchResults: {},
    searchParams: {
        q: '',
        page: 1,
        category: null,
        condition: null,
        minPrice: null,
        maxPrice: null,
        sort: '최신순',
    },
};

export default {
    namespaced: true,
    state: { ...initialState },
    mutations: {
        setSearchResults(state, results) {
            state.searchResults = results;
        },
        setSearchParams(state, params) {
            state.searchParams = { ...state.searchParams, ...params };
        },
        resetState(state) {
            Object.assign(state, initialState);
        },
    },
    actions: {
        setSearchParams({ commit, dispatch }, params) {
            commit('setSearchParams', params);
            return dispatch('searchAuctions');
        },

        async searchAuctions({ commit, state }) {
            try {
                const response = await axios.get(`/search`, {
                    params: state.searchParams,
                });
                commit('setSearchResults', response.data);
            } catch (error) {
                console.error('검색 중 오류 발생:', error);
                // 오류 처리 로직
            }
        },

        resetSearchState({ commit }) {
            commit('resetState');
        },
    },
    getters: {
        getSearchResults: (state) => state.searchResults,
        getSearchParams: (state) => state.searchParams,
    },
};
