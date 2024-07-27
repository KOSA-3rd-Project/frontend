import Vue from 'vue';
import Vuex from 'vuex';

import MemberStore from '@/store/member_store.js';
import Chat from '@/store/chat.js';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    member: MemberStore,
    chat: Chat,
  },
});

export default store;
