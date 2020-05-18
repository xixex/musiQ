import Vue from 'vue';
import Vuex from 'vuex';
import auth from '@/store/modules/auth';
import player from '@/store/modules/player';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  },

  mutations: {
  },

  actions: {
  },

  modules: {
    auth,
    player,
  },
});
