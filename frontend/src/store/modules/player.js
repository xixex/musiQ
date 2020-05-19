import Hls from 'hls.js';

export const MUTATION_SET_CURRENT_TRACK_OBJ = 'MUTATION_SET_CURRENT_TRACK_OBJ';
export const MUTATION_SET_ALL_TRACKS = 'MUTATION_SET_ALL_TRACKS';
export const MUTATION_SET_TRACK_MOMENT = 'MUTATION_SET_TRACK_MOMENT';

export const ACTION_INIT_PLAYER_WITH_TRACK = 'ACTION_INIT_PLAYER_WITH_TRACK';
export const ACTION_PLAY_TRACK = 'ACTION_PLAY_TRACK';
export const ACTION_PAUSE_TRACK = 'ACTION_PAUSE_TRACK';
export const ACTION_PLAY_NEXT_TRACK = 'ACTION_PLAY_NEXT_TRACK';
export const ACTION_PLAY_PREV_TRACK = 'ACTION_PLAY_PREV_TRACK';

export default {
  state: () => ({
    allTracks: [],
    hls: null,
    isHlsInited: false,
    isPlaying: false,
    currentTrackObj: null,
    currentTrackAudioInstance: null,
  }),

  mutations: {
    [MUTATION_SET_CURRENT_TRACK_OBJ](state, { trackObj }) {
      state.currentTrackObj = trackObj;
    },

    [MUTATION_SET_ALL_TRACKS](state, { tracks }) {
      state.allTracks = tracks;
    },

    [MUTATION_SET_TRACK_MOMENT](state, { time }) {
      state.currentTrackAudioInstance.currentTime = time;
    },
  },

  actions: {
    [ACTION_INIT_PLAYER_WITH_TRACK]: ({ state, commit }, { track }) => {
      if (state.hls) {
        state.hls.destroy();
      }

      state.currentTrackObj = track;
      state.currentTrackObj.duration = 0;
      const audioSrc = `${window.hostname}/media/${state.currentTrackObj.id}/stream/`;
      state.currentTrackAudioInstance = new Audio(audioSrc);
      state.hls = new Hls({ maxBufferLength: 10 });
      state.hls.loadSource(audioSrc);
      state.hls.attachMedia(state.currentTrackAudioInstance);

      state.hls.on(Hls.Events.LEVEL_LOADED, (event, data) => {
        commit(MUTATION_SET_CURRENT_TRACK_OBJ, {
          trackObj: { ...state.currentTrackObj, duration: data.details.totalduration },
        });
      });

      state.currentTrackAudioInstance.ontimeupdate = () => {
        commit(MUTATION_SET_CURRENT_TRACK_OBJ, {
          trackObj: {
            ...state.currentTrackObj,
            currentTime: state.currentTrackAudioInstance.currentTime,
          },
        });
      };
    },

    [ACTION_PLAY_TRACK]: ({ state, dispatch }, { track }) => {
      if (state.currentTrackObj && state.currentTrackObj.id !== track.id) {
        state.currentTrackAudioInstance.pause();
        state.hls = null;
      }

      if (state.hls === null) {
        dispatch(ACTION_INIT_PLAYER_WITH_TRACK, { track });
      }

      state.currentTrackAudioInstance.play();
      state.isPlaying = true;
    },

    [ACTION_PAUSE_TRACK]: ({ state }) => {
      state.currentTrackAudioInstance.pause();
      state.isPlaying = false;
    },

    [ACTION_PLAY_NEXT_TRACK]: ({ state, dispatch }) => {
      if (state.currentTrackObj) {
        dispatch(ACTION_PLAY_TRACK, { track: state.currentTrackObj.nextTrack });
      }
    },

    [ACTION_PLAY_PREV_TRACK]: ({ state, dispatch }) => {
      if (state.currentTrackObj) {
        dispatch(ACTION_PLAY_TRACK, { track: state.currentTrackObj.previousTrack });
      }
    },
  },

  getters: {

  },
};
