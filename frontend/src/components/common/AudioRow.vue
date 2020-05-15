<template>
  <div
    class="audio-row"
    @click="playPause"
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
    <span
      class="current-time"
      v-text="currentTime"
    />
  </div>
</template>

<script>
import axios from 'axios';
import Hls from 'hls.js';

export default {
  props: {
    track: {
      required: true,
      default: null,
    },
  },

  data() {
    return {
      isPlaying: false,
      hls: null,
      audioInstance: null,
      currentTime: '0',
    };
  },

  computed: {
    statusLogo() {
      return this.isPlaying
        ? 'https://png.pngtree.com/png-vector/20190120/ourlarge/pngtree-pause-vector-icon-png-image_470715.jpg'
        : 'https://c7.hotpng.com/preview/763/173/273/computer-icons-youtube-play-button-clip-art-icon-png-play-button.jpg';
    },
  },

  methods: {
    playPause() {
      this.isPlaying
        ? this.pauseTrack()
        : this.playTrack();
    },

    initPlayer() {
      this.audioInstance = new Audio(`http://localhost:8080/media/${this.track.id}/stream/`);
      this.audioInstance.ontimeupdate = this.onTimeUpdateListener;
      const audioSrc = `http://localhost:8080/media/${this.track.id}/stream/`;

      this.hls = new Hls();
      this.hls.loadSource(audioSrc);
      this.hls.attachMedia(this.audioInstance);
      this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
        this.audioInstance.play();
      });
    },

    playTrack() {
      this.isPlaying = true;

      if (this.hls === null) {
        this.initPlayer();
      } else {
        this.audioInstance.play();
      }
    },

    pauseTrack() {
      this.isPlaying = false;
      this.audioInstance.pause();
    },

    onTimeUpdateListener() {
      this.currentTime = this.secondsToTime(this.audioInstance.currentTime);
    },

    secondsToTime(seconds) {
      const date = new Date(0);
      date.setSeconds(seconds);
      return date.toISOString().substr(11, 8);
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
