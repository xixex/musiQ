import axios from 'axios';

export const MUTATION_SET_ALL_MY_TRACKS = 'MUTATION_SET_ALL_MY_TRACKS';

export const ACTION_GET_ALL_MY_TRACKS = 'MUTATION_SET_ALL_MY_TRACKS';

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
    [ACTION_GET_ALL_MY_TRACKS]: ({ commit }) => {
      const config = {
        headers: {
          Authorization: localStorage.getItem('access_token'),
        },
      };

      axios.get(`${window.hostname}/api/audio/user-list`, config)
        .then((res) => {
          const tracks = res.data;
          commit(MUTATION_SET_ALL_MY_TRACKS, { tracks });
        });
    },
  },
};
