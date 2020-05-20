import axios from 'axios';
import { prepareTracksNextPrev } from '@/helpers/tracksHelper';

export const MUTATION_SET_ALL_MY_TRACKS = 'MUTATION_SET_ALL_MY_TRACKS';

export const ACTION_UPDATE_ALL_MY_TRACKS = 'MUTATION_SET_ALL_MY_TRACKS';

export default {
  state: () => ({
    allMyTracks: [],
  }),

  mutations: {
    [MUTATION_SET_ALL_MY_TRACKS](state, { tracks }) {
      state.allMyTracks = tracks;
    },
  },

  actions: {
    [ACTION_UPDATE_ALL_MY_TRACKS]: ({ commit }) => {
      const config = {
        headers: {
          Authorization: localStorage.getItem('access_token'),
        },
      };

      return axios.get(`${window.hostname}/api/audio/user-list`, config)
        .then((res) => {
          const tracks = prepareTracksNextPrev(res.data);

          commit(MUTATION_SET_ALL_MY_TRACKS, { tracks });
        });
    },
  },
};
