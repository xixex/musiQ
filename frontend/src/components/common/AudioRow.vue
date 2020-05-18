<template>
  <div
    class="audio-row"
    @click.stop="playPause"
  >
    <img
      alt=""
      :src="statusLogo"
      class="status-btn"
      v-text="'|>'"
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

import { mapActions, mapState } from 'vuex';
import { ACTION_PAUSE_TRACK, ACTION_PLAY_TRACK } from '@/store/modules/player';

export default {
  props: {
    track: {
      required: true,
      default: null,
    },
  },

  data() {
    return {

    };
  },

  computed: {
    ...mapState({
      currentTrackObj: (state) => state.player.currentTrackObj,
      isPlayerPlaying: (state) => state.player.isPlaying,
    }),

    statusLogo() {
      return this.isPlaying
        ? 'https://png.pngtree.com/png-vector/20190120/ourlarge/pngtree-pause-vector-icon-png-image_470715.jpg'
        : 'https://c7.hotpng.com/preview/763/173/273/computer-icons-youtube-play-button-clip-art-icon-png-play-button.jpg';
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

    playPause() {
      this.isPlaying
        ? this.pauseTrack()
        : this.playTrack();
    },

    playTrack() {
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
    border: 1px solid blue;
    cursor: pointer;
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

  }

  .title{
    font-weight: bold;
  }

  .current-time{
    margin-left: auto;
  }
</style>
