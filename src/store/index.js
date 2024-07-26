import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import MemberStore from '@/store/member_store.js';
import SearchStore from '@/store/search_store.js';

const store = new Vuex.Store({
    modules: {
        member: MemberStore,
        search: SearchStore,
    },
});

export default store;
