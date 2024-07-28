import axios from 'axios';

const SearchStore = {
    namespaced: true,
    state: {
        searchResults: {},
    },
    mutations: {
        setSearchResults(state, results) {
            state.searchResults = results;
        },
    },
    actions: {
        async searchAuctions({ commit }, { query, page }) {
            try {
                const response = await axios.get(`/search`, {
                    params: { q: query, page: page },
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
    },
};

export default SearchStore;
