const store = {
    namespaced: true,
    state() {
        return {
            access_token: localStorage.getItem('accessToken') || '',
            member_info: {},
        };
    },

    mutations: {
        login(state, payload) {
            state.access_token = payload.access_token;
            state.member_info = payload.member_info;

            localStorage.setItem('accessToken', payload.access_token); // 로컬 스토리지에 엑세스 토큰 저장
        },
        logout(state, payload) {
            state.access_token = payload.access_token;
            state.member_info = payload.member_info;

            localStorage.removeItem('accessToken'); // 엑세스 토큰 삭제
        },
    },

    actions: {
        login(context, payload) {
            context.commit('login', payload);
        },
        logout(context, payload) {
            context.commit('logout', payload);
        },
        // autoLogin({ commit }) {
        //     const token = localStorage.getItem('accessToken');
        //     if (token) {
        //         const memberInfo = {};
        //         commit('login', { access_token: token, member_info: memberInfo });
        //     }
        // },
    },

    getters: {
        getAccessToken(state) {
            return state.access_token;
        },
        getMemberInfo(state) {
            return state.member_info;
        },
    },
};

export default store;
