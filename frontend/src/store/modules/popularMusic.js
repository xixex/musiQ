import axios from 'axios';
import { prepareTracksNextPrev } from '@/helpers/tracksHelper';
import { ACTION_UPDATE_ALL_MY_TRACKS } from '@/store/modules/myMusic';

export const MUTATION_SET_ALL_POPULAR_TRACKS = 'MUTATION_SET_ALL_POPULAR_TRACKS';

export const ACTION_UPDATE_ALL_POPULAR_TRACKS = 'ACTION_UPDATE_ALL_POPULAR_TRACKS';
export const ACTION_ADD_NEW_TRACK = 'ACTION_ADD_NEW_TRACK';

export default {
  state: () => ({
    allPopularTracks: [],
  }),

  mutations: {
    [MUTATION_SET_ALL_POPULAR_TRACKS](state, { tracks }) {
      state.allPopularTracks = tracks;
    },
  },

  actions: {
    [ACTION_UPDATE_ALL_POPULAR_TRACKS]: ({ commit }) => axios.get(`${window.hostname}/api/audio/tracks`)
      .then((res) => {
        const tracks = prepareTracksNextPrev(res.data);

        commit(MUTATION_SET_ALL_POPULAR_TRACKS, { tracks });
      }),


    [ACTION_ADD_NEW_TRACK]: ({ dispatch }, { track }) => {
      const config = {
        headers: {
          Authorization: localStorage.getItem('access_token'),
        },
      };

      return axios.post(`${window.hostname}/api/audio/tracks`, track, config)
        .then(() => {
          dispatch(ACTION_UPDATE_ALL_POPULAR_TRACKS);
          dispatch(ACTION_UPDATE_ALL_MY_TRACKS);
        });
    },
  },
};
