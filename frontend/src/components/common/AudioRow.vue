<template>
  <div
    :class="['audio-row', {'disabled': isMyMusic && !isAdded}, {'active' : isPlaying}]"
    @click.stop="playPause"
  >
    <div :class="['status-btn', {'playing': isPlaying}]">
      <img
        alt=""
        class="status-logo"
        :src="statusLogo"
      >
    </div>

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
    <div
      v-if="isAuthorised"
      class="audio-controls"
    >
      <template v-if="isAddable">
        <img
          v-if="isAdded"
          class="delete-btn control"
          :src="deleteIcon"
          alt=""
          @click.stop="removeAudio"
        >
        <img
          v-else
          class="add-btn control"
          src="@/assets/delete.svg"
          alt=""
          @click.stop="addAudio"
        >
      </template>
      <template v-if="isPickable">
        <div
          :class="['pick-circle', {'picked' : isPicked}]"
          @click.stop="togglePick"
        >
          <img
            v-if="isPicked"
            class="pick-check"
            src="@/assets/check.svg"
            alt=""
          >
        </div>
      </template>
    </div>
  </div>
</template>

<script>

import axios from 'axios';
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

    isMyMusic: {
      required: false,
      default: false,
    },

    isPickable: {
      required: false,
      default: false,
    },

    isAddable: {
      required: false,
      default: false,
    },
  },

  data() {
    return {
      isAdded: false,
      isPicked: false,
    };
  },

  computed: {
    ...mapState({
      currentTrackObj: (state) => state.player.currentTrackObj,
      isPlayerPlaying: (state) => state.player.isPlaying,
      allMyTracks: (state) => state.myMusic.allMyTracks,
      isAuthorised: (state) => state.auth.isAuthorised,
    }),

    statusLogo() {
      return this.isPlaying
        ? require('@/assets/pause2.svg')
        : require('@/assets/play2.svg');
    },

    isPlaying() {
      return this.currentTrackObj
        && this.track.id === this.currentTrackObj.id
        && this.isPlayerPlaying === true;
    },

    deleteIcon() {
      return this.isMyMusic
        ? require('@/assets/delete.svg')
        : require('@/assets/check.svg');
    },
  },

  watch: {
    allMyTracks() {
      this.setIsAdded();
    },
  },

  mounted() {
    this.setIsAdded();
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

    togglePick() {
      if (!this.isPicked) {
        this.$emit('pickTrack', this.track.id);
        this.isPicked = true;
      } else {
        this.$emit('unpickTrack', this.track.id);
        this.isPicked = false;
      }
    },

    removeAudio() {
      const config = {
        headers: {
          Authorization: localStorage.getItem('access_token'),
        },
      };

      const data = {
        trackID: this.track.id,
      };

      axios.patch(`${window.hostname}/api/audio/user-list/remove`, data, config)
        .then(() => {
          this.isAdded = false;
        });
    },

    addAudio() {
      const config = {
        headers: {
          Authorization: localStorage.getItem('access_token'),
        },
      };

      const data = {
        trackID: this.track.id,
      };

      axios.patch(`${window.hostname}/api/audio/user-list/add`, data, config)
        .then(() => {
          this.isAdded = true;
        });
    },

    setIsAdded() {
      if (this.allMyTracks.some((e) => e.id === this.track.id)) {
        this.isAdded = true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "~assets/main.scss";

  .audio-row{
    width: 100%;
    height: 60px;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    cursor: pointer;
    color: white;
    border-radius: 0.5em;
    font-size: 14px;
    padding: 10px 18px;

    &.disabled{
      opacity: 0.4;
    }

    &:hover{
      background: #242629;
      box-shadow: inset 5px 5px 11px #212326,
      inset -5px -5px 11px #27292c;
    }

    &.active
    {
      background: #242629;
      box-shadow: inset 5px 5px 11px #1c1e20,
      inset -5px -5px 11px #2c2e32;
    }
  }

  .status-btn{
    width: 30px;
    height: 30px;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background: linear-gradient(145deg, #3f484e, #26282e);
    box-shadow:  4px 4px 8px #25292d,
    -4px -4px 8px #434951;
    position: relative;

    &:after{
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      border: 2px solid #34363c;
    }

    &.playing{
      background: linear-gradient(145deg , #00421e, #00ff64);
      box-shadow:  5px 5px 13px #25292d,
      -5px -5px 13px #434951;

      &:after{
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        border: 2px solid #00c64f;
      }
    }
  }

  .status-logo{
    width: 8px;
  }

  .track-name{
    flex-direction: column;
    text-align: left;
    padding: 0 12px;
    line-height: 1.4;
  }

  .title{
    font-weight: bold;
  }

  .author{
    font-size: 11px;
    opacity: 0.6;
  }

  .audio-controls{
    margin-left: auto;
  }

  .control{
    margin-left: 12px;

    &:hover{
      transform: scale(1.4);
    }
  }

  .delete-btn{
    width: 12px;
  }

  .add-btn{
    width: 12px;
    transform: rotate(45deg);

    &:hover{
      transform: scale(1.4) rotate(45deg);
    }
  }

  .pick-circle{
    border: 1px solid white;
    width: 20px;
    height: 20px;
    margin-left: 12px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover{
      transform: scale(1.2);
    }
  }

  .pick-check{
    width: 100%;
    margin-left: 4px;
    margin-bottom: 4px;
  }

</style>
