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
    <div
      v-if="isAuthorised"
      class="audio-controls"
    >
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
  },

  data() {
    return {
      isAdded: false,
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
        ? require('@/assets/pause.svg')
        : require('@/assets/play.svg');
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
          this.$emit('forceUpdate');
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
          this.$emit('forceUpdate');
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
  .audio-row{
    width: 100%;
    height: 60px;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    cursor: pointer;
    color: white;
    font-size: 14px;
    border-bottom: 1px solid rgba(255,255,255,0.2);
    padding: 10px 18px;

    &:hover{
      background-color: rgba(0,0,0,0.4);
    }
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
    padding: 0 12px;
  }

  .title{
    font-weight: bold;
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

</style>
