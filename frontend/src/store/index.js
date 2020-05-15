import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isAuthorised: false,
  },

  mutations: {
    SET_AUTHORISED(state, authorised) {
      state.isAuthorised = authorised;
    },
  },

  actions: {
  },

  modules: {
  },
});
