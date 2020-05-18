<template>
  <div class="player-audio">
    <div class="player-content">
      <div
        v-if="currentTrackObj"
        class="artist-wrapper"
      >
        <img
          class="track-logo"
          src="https://i.pinimg.com/originals/bd/94/57/bd945731bba069d23d6129f8fd0cf0d0.png"
          alt=""
        >
        <span
          class="author"
          v-text="currentTrackObj.author"
        />
      </div>
      <div class="controls">
        <img
          class="control-btn back-btn"
          src="@/assets/forward.svg"
          alt=""
        >
        <img
          class="control-btn play-btn"
          :src="playLogo"
          alt=""
          @click="playPause"
        >
        <img
          class="control-btn forward-btn"
          src="@/assets/forward.svg"
          alt=""
        >
      </div>
      <div
        class="track-wrapper"
      >
        <div
          v-if="currentTrackObj"
          class="track-info"
        >
          <span
            class="track-title"
            v-text="currentTrackObj.title"
          />
          <div class="time">
            <span v-text="currentTimeString" />
            <span v-text="' / '" />
            <span v-text="durationString" />
          </div>
        </div>
        <div class="time-line">
          <div
            v-if="currentTrackObj"
            class="time-line-progress"
            :style="{width: timeLineWidth}"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { secondsToTimeString } from '@/helpers/timeHelper';
import { ACTION_PAUSE_TRACK, ACTION_PLAY_TRACK } from '@/store/modules/player';

export default {
  computed: {
    ...mapState({
      currentTrackObj: (state) => state.player.currentTrackObj,
      isPlaying: (state) => state.player.isPlaying,
    }),

    currentTimeString() {
      return secondsToTimeString(this.currentTrackObj.currentTime);
    },

    durationString() {
      return secondsToTimeString(this.currentTrackObj.duration);
    },

    playLogo() {
      return this.isPlaying ? require('@/assets/pause.svg') : require('@/assets/play.svg');
    },

    timeLineWidth() {
      return `${this.currentTrackObj.currentTime / this.currentTrackObj.duration / 0.01}%`;
    },
  },

  methods: {
    ...mapActions({
      ACTION_PAUSE_TRACK,
      ACTION_PLAY_TRACK,
    }),

    playPause() {
      this.isPlaying
        ? this.pauseTrack()
        : this.playTrack();
    },

    playTrack() {
      this.ACTION_PLAY_TRACK({ track: this.currentTrackObj });
    },

    pauseTrack() {
      this.ACTION_PAUSE_TRACK();
    },
  },
};
</script>

<style lang="scss" scoped>
  .player-audio{
    position: fixed;
    bottom: 0;
    justify-content: center;
    align-items: center;
    width: 100%;
    color: white;
    font-size: 14px;
    background: rgba(21,21,24);
  }

  .player-content{
    width: 80%;
    justify-content: center;
    align-items: center;
  }

  .controls{
    flex-direction: row;
    align-items: center;
    width: max-content;
    margin-right: auto;
  }

  .control-btn{
    height: 100%;
    padding: 0 10px;

    &:hover{
      opacity: 0.6;
      cursor: pointer;
    }
  }

  .play-btn{
    width: 70px;
    height: 70px;
  }

  .back-btn{
    transform: rotate(180deg);
  }

  .back-btn,
  .forward-btn{
    width: 20px;
  }

  .track-wrapper{
    flex-direction: column;
    height:  24px;
    padding: 0 10px;
    width: 100%;
  }

  .track-info{
    width: 100%;
  }

  .track-title{

  }

  .time{
    display:inline-block;
    margin-left: auto;
    font-size: 12px;
  }

  .time-line{
    width: 100%;
    background: white;
    height: 3px;
    border-radius: 2px;
    margin-top: auto;
  }

  .artist-wrapper{
    height: 80%;
    padding: 20px;
    align-items: center;
  }

  .track-logo{
    width: 80px;
    padding-right: 20px;
    object-fit: cover;
  }

  .author{
    width: 100px;
    font-weight: bold;
    white-space: nowrap;
    overflow: hidden;
  }

  .time-line-progress{
    height: 100%;
    background-image: linear-gradient(#FDFC47, #24FE41);
  }

  @media only screen and (max-width: 1440px) {

    .player-content{
      width: 100%;
    }
  }
</style>
