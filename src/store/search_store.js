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
        SET_SEARCH_RESULTS(state, results) {
            state.searchResults = results;
        },
        SET_SEARCH_PARAMS(state, params) {
            state.searchParams = { ...state.searchParams, ...params };
        },
        RESET_STATE(state) {
            Object.assign(state, initialState);
        },
        CLEAR_CATEGORY(state) {
            state.searchParams.category = null;
        },
    },
    actions: {
        setSearchParams({ commit, dispatch }, params) {
            commit('SET_SEARCH_PARAMS', params);
            return dispatch('searchAuctions');
        },

        async searchAuctions({ commit, state }) {
            try {
                const response = await axios.get(`/search`, {
                    params: state.searchParams,
                });
                commit('SET_SEARCH_RESULTS', response.data);
            } catch (error) {
                console.error('검색 중 오류 발생:', error);
            }
        },

        resetSearchState({ commit }) {
            commit('RESET_STATE');
        },

        setCategory({ commit, dispatch }, category) {
            commit('SET_SEARCH_PARAMS', { category });
            return dispatch('searchAuctions');
        },

        clearCategory({ commit }) {
            commit('CLEAR_CATEGORY');
        },

        newSearch({ commit, dispatch }, query) {
            commit('CLEAR_CATEGORY');
            commit('SET_SEARCH_PARAMS', { q: query, page: 1 });
            return dispatch('searchAuctions');
        },
    },
    getters: {
        getSearchResults: (state) => state.searchResults,
        getSearchParams: (state) => state.searchParams,
        getSelectedCategory: (state) => state.searchParams.category,
    },
};
