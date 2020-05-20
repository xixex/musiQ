<template>
  <div class="tracklist">
    <search-bar />
    <div class="list-wrapper">
      <div
        v-for="(track,i) in tracks"
        :key="i"
      >
        <audio-row
          :track="track"
          :all-tracks="tracks"
          :is-my-music="isMyMusic"
          :is-pickable="isPickable"
          :is-addable="isAddable"
          @pickTrack="pickTrack"
          @unpickTrack="unpickTrack"
        />
      </div>
    </div>
  </div>
</template>

<script>
import AudioRow from '@/components/common/AudioRow';
import { mapMutations } from 'vuex';
import { MUTATION_SET_ALL_MY_TRACKS } from '@/store/modules/myMusic';
import SearchBar from '@/components/user-content/SearchBar';

export default {
  components: {
    SearchBar,
    AudioRow,
  },

  props: {
    tracks: {
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


  methods: {
    ...mapMutations({
      MUTATION_SET_ALL_MY_TRACKS,
    }),

    pickTrack(id) {
      this.$emit('pickTrack', id);
    },

    unpickTrack(id) {
      this.$emit('unpickTrack', id);
    },
  },
};
</script>

<style lang="scss" scoped>
  .tracklist{
    display: flex;
    flex-direction: column;
  }

  .list-wrapper{
    flex-direction: column;
    overflow: scroll;
  }

</style>
