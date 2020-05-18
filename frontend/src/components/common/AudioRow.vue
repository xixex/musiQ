<template>
  <div
    class="audio-row"
    @click.stop="playPause"
  >
    <img
      alt=""
      :src="statusLogo"
      class="status-btn"
    >
    <div class="track-name">
      <span
        class="title"
        v-text="track.title"
      />
      <span
        class="author"
        v-text="track.author"
      />
    </div>
  </div>
</template>

<script>

import { mapActions, mapMutations, mapState } from 'vuex';
import {
  ACTION_PAUSE_TRACK,
  ACTION_PLAY_TRACK,
  MUTATION_SET_ALL_TRACKS,
} from '@/store/modules/player';

export default {
  props: {
    track: {
      required: true,
      default: null,
    },

    allTracks: {
      required: true,
      default: null,
    },
  },

  computed: {
    ...mapState({
      currentTrackObj: (state) => state.player.currentTrackObj,
      isPlayerPlaying: (state) => state.player.isPlaying,
    }),

    statusLogo() {
      return this.isPlaying
        ? require('@/assets/pause.svg')
        : require('@/assets/play.svg');
    },

    isPlaying() {
      return this.currentTrackObj
        && this.track.id === this.currentTrackObj.id
        && this.isPlayerPlaying === true;
    },
  },

  methods: {
    ...mapActions({
      ACTION_PLAY_TRACK,
      ACTION_PAUSE_TRACK,
    }),

    ...mapMutations({
      MUTATION_SET_ALL_TRACKS,
    }),

    playPause() {
      this.isPlaying
        ? this.pauseTrack()
        : this.playTrack();
    },

    playTrack() {
      this.MUTATION_SET_ALL_TRACKS({ tracks: this.allTracks });
      this.ACTION_PLAY_TRACK({ track: this.track });
    },

    pauseTrack() {
      this.ACTION_PAUSE_TRACK();
    },
  },
};
</script>

<style lang="scss" scoped>
  .audio-row{
    width: 100%;
    height: 40px;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    cursor: pointer;
    color: white;
    font-size: 14px;
  }

  .status-btn{
    width: 40px;
    height: 40px;
    justify-content: center;
    align-items: center;
  }

  .track-name{
    flex-direction: column;
    text-align: left;
    padding: 0 5px;
  }

  .title{
    font-weight: bold;
  }

  .current-time{
    margin-left: auto;
  }
</style>
