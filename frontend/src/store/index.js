import Vue from 'vue';
import Vuex from 'vuex';
import auth from '@/store/modules/auth';
import player from '@/store/modules/player';
import myMusic from '@/store/modules/myMusic';
import playlists from '@/store/modules/playlists';
import popularMusic from '@/store/modules/popularMusic';

Vue.use(Vuex);

export const MUTATION_SET_WINDOW_WIDTH = 'MUTATION_SET_WINDOW_WIDTH';

export default new Vuex.Store({
  state: {
    windowWidth: 0,
  },

  mutations: {
    [MUTATION_SET_WINDOW_WIDTH]: (state, { width }) => {
      state.windowWidth = width;
    },
  },

  actions: {
  },

  modules: {
    auth,
    player,
    myMusic,
    popularMusic,
    playlists,
  },
});
