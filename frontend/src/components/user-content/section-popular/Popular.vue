<template>
  <div class="my-music">
    <search-bar />
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
    SearchBar,
  },

  data() {
    return {
      relPath: '/api/audio/tracks',
    };
  },
};
</script>

<style lang="scss" scoped>
  .my-music{
    display: flex;
    flex-direction: column;
  }

</style>
