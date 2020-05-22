<template>
  <div class="player-audio-mobile">
    <button-control
      :logo="require('@/assets/go-back.svg')"
      class="button-go-back"
      @click.native="hidePlayerMobile"
    />
    <div class="track-logo-wrapper">
      <img
        v-if="currentTrackObj"
        class="track-logo"
        src="https://i.pinimg.com/originals/a9/54/26/a95426fe10165c183007c10c3592fa83.jpg"
        alt=""
      >
    </div>
    <div class="track-wrapper">
      <div
        v-if="currentTrackObj"
        class="track-info"
      >
        <div class="author-title">
          <span
            class="track-title"
            v-text="currentTrackObj.title"
          />
          <span
            class="author"
            v-text="currentTrackObj.author"
          />
        </div>
        <div class="time">
          <span v-text="currentTimeString" />
          <span v-text="durationString" />
        </div>
      </div>
      <div class="time-line">
        <input
          v-if="currentTrackObj"
          :style="{background: `linear-gradient(90deg, #00F260 0%, #0575E6 ${currentTimePercent}%, #fff ${currentTimePercent}% , #fff 100%`}"
          :value="currentTrackObj.currentTime"
          type="range"
          class="range"
          min="0"
          :max="currentTrackObj.duration"
          step="1"
          @input="setTime"
        >
      </div>
    </div>
    <div class="controls">
      <div
        class="control-btn back-btn"
        @click="playPrevious"
      >
        <img
          src="@/assets/forward.svg"
          alt=""
          class="back-logo"
        >
      </div>
      <div
        v-if="!isPlaying"
        class="control-btn play-btn"
        @click="playPause"
      >
        <img
          src="@/assets/play2.svg"
          alt=""
          class="play-logo"
        >
      </div>
      <div
        v-else
        class="control-btn pause-btn"
        @click="playPause"
      >
        <img
          src="@/assets/pause2.svg"
          alt=""
          class="play-logo"
        >
      </div>
      <div
        class="control-btn forward-btn"
        @click="playNext"
      >
        <img
          src="@/assets/forward.svg"
          alt=""
          class="forward-logo"
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import { secondsToTimeString } from '@/helpers/timeHelper';
import {
  ACTION_PAUSE_TRACK,
  ACTION_PLAY_TRACK,
  ACTION_PLAY_NEXT_TRACK,
  ACTION_PLAY_PREV_TRACK,
  MUTATION_SET_TRACK_MOMENT,
} from '@/store/modules/player';
import ButtonControl from '@/components/common/ButtonControl';

export default {
  components: { ButtonControl },
  computed: {
    ...mapState({
      currentTrackObj: (state) => state.player.currentTrackObj,
      currentTrackAudioInstance: (state) => state.player.currentTrackAudioInstance,
      isPlaying: (state) => state.player.isPlaying,
    }),

    currentTimeString() {
      return secondsToTimeString(this.currentTrackObj.currentTime);
    },

    durationString() {
      return secondsToTimeString(this.currentTrackObj.duration);
    },

    currentTimePercent() {
      return this.currentTrackObj.currentTime / this.currentTrackObj.duration / 0.01;
    },

    playLogo() {
      return this.isPlaying ? require('@/assets/pause.svg') : require('@/assets/play.svg');
    },
  },

  methods: {
    ...mapActions({
      ACTION_PAUSE_TRACK,
      ACTION_PLAY_TRACK,
      ACTION_PLAY_NEXT_TRACK,
      ACTION_PLAY_PREV_TRACK,
    }),

    ...mapMutations({
      MUTATION_SET_TRACK_MOMENT,
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

    playNext() {
      this.ACTION_PLAY_NEXT_TRACK();
    },

    playPrevious() {
      this.ACTION_PLAY_PREV_TRACK();
    },

    setTime(event) {
      this.MUTATION_SET_TRACK_MOMENT({ time: event.target.value });
    },

    hidePlayerMobile() {
      this.$emit('hidePlayerMobile');
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "~assets/main.scss";

  .player-audio-mobile{
    position: absolute;
    bottom: 0;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    color: white;
    font-size: 14px;
    padding: 30px 30px;
    z-index: 1000;
    background: $gray1;
    height: 100vh;
  }

  .player-content{
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    height: calc(100vh - 100px);
  }

  .controls{
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 25%;
  }

  .control-btn{
    margin: 0 10px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60px;
    height: 60px;
    cursor: pointer;
    background: linear-gradient(145deg, #383d43, #2f3339);
    box-shadow:  4px 4px 8px #25292d,
    -4px -4px 8px #434951;

    &:active{
      background: #34393f;
      box-shadow: inset 4px 4px 8px #25292d,
      inset -4px -4px 8px #434951;
    }
  }

  .pause-btn,
  .play-btn{
    z-index: 5;
  }

  .pause-btn{
    position: relative;
    background: linear-gradient(145deg , #00421e, #00ff64);
    box-shadow:  9px 9px 18px #262a2f,
    -9px -9px 18px #42484f;

    &:after{
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      border: 2px solid #00c64f;
    }
  }

  .play-logo{
    width: 12px;
  }

  .forward-logo,
  .back-logo{
    width: 12px;
  }

  .back-logo{
    transform: rotate(180deg);
  }

  .track-wrapper{
    flex-direction: column;
    justify-content: flex-end;
    position: relative;
    width: 100%;
    height: 25%;
  }

  .track-info{
    width: 100%;
    flex-direction: column;
    align-items: center;
  }

  .time{
    display: flex;
    width: 100%;
    justify-content: space-between;
    font-size: 8px;
    padding: 6px 1px;
  }

  .artist-wrapper{
    height: 80%;
    padding: 20px;
    align-items: center;
  }

  .track-logo-wrapper{
    margin-top: auto;
    border-radius: 50%;
    overflow: hidden;
    box-shadow:  10px 10px 20px #23272b,
    -10px -10px 20px #454b53;
    position: relative;
  }

  .track-logo{
    width: 20em;
    height: 20em;
    object-fit: cover;
  }

  .author-title{
    display: flex;
    flex-direction: column;
    white-space: nowrap;
    overflow: hidden;
    padding-right: 8px;
    text-align: left;
  }

  .track-title{
    font-weight: bold;
    font-size: 20px;
    line-height: 0.8;
  }

  .author{
    font-size: 12px;
    opacity: 0.6;
    line-height: 2;
  }

  .time-line{
    width: 100%;
  }

  .range {
    width: 100%;
    -webkit-appearance: none;
    cursor: pointer;
    height: 5px;
    margin: 0;
    outline: none;
    border-radius: 3px;
    box-shadow: inset 1px 1px 3px #292c31;


    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      height: 18px;
      width: 18px;
      border-radius: 50%;
      cursor: pointer;
      border: 5px solid #34393f;
      background: linear-gradient(45deg, #00F260, #0575E6);
      box-shadow:  1px 1px 3px #151719,
      -1px -1px 3px #535b65;
    }
  }

  .button-go-back{
    align-self: flex-start;
    margin-left: 0;
  }
</style>
