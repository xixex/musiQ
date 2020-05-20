<template>
  <div class="popular">
    <track-list
      :is-addable="true"
      :tracks="allPopularTracks"
    />
  </div>
</template>

<script>
import TrackList from '@/components/common/TrackList';
import { mapActions, mapState } from 'vuex';
import { ACTION_UPDATE_ALL_POPULAR_TRACKS } from '@/store/modules/popularMusic';

export default {
  components: {
    TrackList,
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
