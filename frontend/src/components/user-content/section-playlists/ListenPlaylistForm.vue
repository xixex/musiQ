<template>
  <modal @close="closeForm">
    <div class="box">
      <h2 v-text="playlist.title" />
      <track-list
        class="track-list"
        :is-pickable="false"
        :tracks="playlist.tracklist"
      />
    </div>
  </modal>
</template>

<script>

import Modal from '@/components/common/Modal';
import TrackList from '@/components/common/TrackList';

export default {
  components: {
    TrackList,
    Modal,
  },

  props: {
    playlist: {
      required: true,
      default: null,
    },
  },

  methods: {
    closeForm() {
      this.$emit('close');
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "~assets/main.scss";

  .box {
    position: absolute;
    flex-direction: column;
    top: calc(50% - 40px);
    left: 50%;
    transform: translate(-50%, -50%);
    width: 600px;
    height: calc(100% - 188px);
    padding: 2.5rem;
    box-sizing: border-box;
    background: rgba(0, 0, 0, 0.6);
    background: $gray1;
    border-radius: 10px;
    border: 4px solid $gray1;
    box-shadow:  7px 7px 14px #000000,
    -7px -7px 14px #000000;
  }

  .box h2 {
    margin: 0 0 1.875rem;
    padding: 0;
    color: #fff;
    text-align: center;
  }

  .track-list{
    position: absolute;
    top: 80px;
    bottom: 40px;
    right: 40px;
    left: 40px;
    box-sizing: border-box;
  }
</style>
