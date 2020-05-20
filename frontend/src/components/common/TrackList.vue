<template>
  <div class="tracklist">
    <div
      v-for="(track,i) in tracks"
      :key="i"
    >
      <audio-row
        :track="track"
        :all-tracks="tracks"
        :is-my-music="isMyMusic"
        @forceUpdate="getTracks"
      />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import AudioRow from '@/components/common/AudioRow';
import { mapMutations } from 'vuex';
import { MUTATION_SET_ALL_MY_TRACKS } from '@/store/modules/myMusic';


export default {
  components: {
    AudioRow,
  },

  props: {
    relPath: {
      required: true,
      default: '',
    },

    isAuthorisedApi: {
      required: false,
      default: false,
    },

    isMyMusic: {
      required: false,
      default: false,
    },
  },

  data() {
    return {
      tracks: null,
      audio: null,
    };
  },

  mounted() {
    this.getTracks();
  },

  methods: {
    ...mapMutations({
      MUTATION_SET_ALL_MY_TRACKS,
    }),

    getTracks() {
      const config = {};

      if (this.isAuthorisedApi) {
        config.headers = {
          Authorization: localStorage.getItem('access_token'),
        };
      }

      axios.get(`${window.hostname}${this.relPath}`, config)
        .then((res) => {
          this.tracks = this.prepareTracks(res.data);

          if (this.isMyMusic) {
            this.MUTATION_SET_ALL_MY_TRACKS({ tracks: this.tracks });
          }
        });
    },

    prepareTracks(tracks) {
      const preparedTracks = [...tracks];

      for (let i = 0; i < preparedTracks.length; i++) {
        preparedTracks[i].duration = 0;
        preparedTracks[i].currentTime = 0;
        preparedTracks[i].nextTrack = preparedTracks[i + 1];
        preparedTracks[i].previousTrack = preparedTracks[i - 1];
      }

      if (preparedTracks.length > 0) {
        preparedTracks[0].previousTrack = preparedTracks[preparedTracks.length - 1];
        preparedTracks[preparedTracks.length - 1].nextTrack = preparedTracks[0];
      }

      return preparedTracks;
    },
  },
};
</script>

<style lang="scss" scoped>
  .tracklist{
    display: flex;
    flex-direction: column;
  }

</style>
