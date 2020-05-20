<template>
  <div class="my-music">
    <track-list
      class="track-list"
      :is-my-music="true"
      :is-addable="true"
      :tracks="allMyTracks"
    />
  </div>
</template>

<script>
import TrackList from '@/components/common/TrackList';
import { mapActions, mapState } from 'vuex';
import { ACTION_UPDATE_ALL_MY_TRACKS } from '@/store/modules/myMusic';

export default {
  components: {
    TrackList,
  },

  computed: {
    ...mapState({
      allMyTracks: (state) => state.myMusic.allMyTracks,
    }),
  },

  mounted() {
    this.ACTION_UPDATE_ALL_MY_TRACKS();
  },

  methods: {
    ...mapActions({
      ACTION_UPDATE_ALL_MY_TRACKS,
    }),
  },
};
</script>

<style lang="scss" scoped>
  .my-music{
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow-y: scroll;
  }

</style>
