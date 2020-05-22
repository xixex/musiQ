<template>
  <div class="popular">
    <audio-row-list
      :is-addable="true"
      :tracks="allPopularTracks"
    />
  </div>
</template>

<script>
import AudioRowList from '@/components/common/AudioRowList';
import { mapActions, mapState } from 'vuex';
import { ACTION_UPDATE_ALL_POPULAR_TRACKS } from '@/store/modules/popularMusic';

export default {
  components: {
    AudioRowList,
  },

  computed: {
    ...mapState({
      allPopularTracks: (state) => state.popularMusic.allPopularTracks,
    }),
  },

  mounted() {
    this.ACTION_UPDATE_ALL_POPULAR_TRACKS();
  },

  methods: {
    ...mapActions({
      ACTION_UPDATE_ALL_POPULAR_TRACKS,
    }),
  },
};
</script>

<style lang="scss" scoped>
  .popular{
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow-y: scroll;
  }

</style>
