import axios from 'axios';
import { prepareTracksNextPrev } from '@/helpers/tracksHelper';

export const MUTATION_SET_ALL_MY_PLAYLISTS = 'MUTATION_SET_ALL_MY_PLAYLISTS';

export const ACTION_UPDATE_ALL_MY_PLAYLISTS = 'ACTION_UPDATE_ALL_MY_PLAYLISTS';
export const ACTION_CREATE_NEW_PLAYLIST = 'ACTION_CREATE_NEW_PLAYLIST';
export const ACTION_REMOVE_PLAYLIST = 'ACTION_REMOVE_PLAYLIST';

export default {
  state: () => ({
    allMyPlaylists: [],
  }),

  mutations: {
    [MUTATION_SET_ALL_MY_PLAYLISTS](state, { playlists }) {
      state.allMyPlaylists = playlists;
    },
  },

  actions: {
    [ACTION_UPDATE_ALL_MY_PLAYLISTS]: ({ commit }) => {
      const config = {
        headers: {
          Authorization: localStorage.getItem('access_token'),
        },
      };

      return axios.get(`${window.hostname}/api/audio/user-playlists`, config)
        .then((res) => {
          const playlists = res.data.map((e) => ({ ...e, tracklist: prepareTracksNextPrev(e.tracklist) }));


          commit(MUTATION_SET_ALL_MY_PLAYLISTS, { playlists });
        });
    },

    [ACTION_CREATE_NEW_PLAYLIST]: ({ dispatch }, { playlist }) => {
      const config = {
        headers: {
          Authorization: localStorage.getItem('access_token'),
        },
      };

      return axios.post(`${window.hostname}/api/audio/playlists`, playlist, config)
        .then(() => {
          dispatch(ACTION_UPDATE_ALL_MY_PLAYLISTS);
        });
    },

    [ACTION_REMOVE_PLAYLIST]: ({ dispatch }, { id }) => {
      const config = {
        headers: {
          Authorization: localStorage.getItem('access_token'),
        },
      };

      return axios.delete(`${window.hostname}/api/audio/playlists/${id}`, config)
        .then(() => {
          dispatch(ACTION_UPDATE_ALL_MY_PLAYLISTS);
        });
    },
  },
};
