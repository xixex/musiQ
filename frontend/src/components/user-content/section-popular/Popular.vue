<template>
  <div class="popular">
    <track-list
      :rel-path="relPath"
    />
  </div>
</template>

<script>
import TrackList from '@/components/common/TrackList';
import SearchBar from '@/components/user-content/SearchBar';

export default {
  components: {
    TrackList,
  },

  data() {
    return {
      relPath: '/api/audio/tracks',
    };
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
