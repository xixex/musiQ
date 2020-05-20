import Vue from 'vue';
import Vuex from 'vuex';
import auth from '@/store/modules/auth';
import player from '@/store/modules/player';
import myMusic from '@/store/modules/myMusic';
import playlists from '@/store/modules/playlists';
import popularMusic from '@/store/modules/popularMusic';

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
    myMusic,
    popularMusic,
    playlists,
  },
});
