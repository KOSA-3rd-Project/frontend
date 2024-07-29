import axios from 'axios';

const SearchStore = {
    namespaced: true,
    state: {
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
    },
    mutations: {
        setSearchResults(state, results) {
            state.searchResults = results;
        },
        setSearchParams(state, params) {
            state.searchParams = { ...state.searchParams, ...params };
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
    },
    getters: {
        getSearchResults: (state) => state.searchResults,
        getSearchParams: (state) => state.searchParams,
    },
};

export default SearchStore;
