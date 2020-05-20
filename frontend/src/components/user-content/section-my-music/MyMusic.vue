<template>
  <div class="my-music">
    <track-list
      class="track-list"
      :rel-path="relPath"
      :is-authorised-api="true"
      :is-my-music="true"
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
      relPath: '/api/audio/user-list',
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
