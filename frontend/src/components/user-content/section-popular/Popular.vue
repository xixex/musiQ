<template>
  <div class="my-music">
    <track-list
      :rel-path="relPath"
    />
  </div>
</template>

<script>
import TrackList from '@/components/common/TrackList';

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
  .my-music{
    display: flex;
    flex-direction: column;
  }

</style>
