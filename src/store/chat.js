export default {
    namespaced: true,
    state: {
      messages: []
    },
    getters: {
      messages: state => state.messages
    },
    mutations: {
      addMessage(state, message) {
        state.messages.push(message);
      }
    },
    actions: {
      addMessage({ commit }, message) {
        commit('addMessage', message);
      }
    }
  };
  