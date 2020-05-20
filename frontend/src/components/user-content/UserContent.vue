<template>
  <div class="user-content">
    <search-bar />
    <div class="user-controls">
      <img
        class="upload-logo"
        src="@/assets/addplaylist.svg"
        alt=""
      >
      <img
        :src="require('@/assets/upload.svg')"
        class="upload-logo"
        alt=""
        @click="openNewTrackForm"
      >
    </div>
    <router-view />
  </div>
</template>

<script>

import SearchBar from '@/components/user-content/SearchBar';

export default {
  components: {
    SearchBar,

  },

  methods: {
    openNewPlaylistForm() {
      this.$emit('openNewPlaylistForm');
    },

    openNewTrackForm() {
      this.$emit('openNewTrackForm');
    },
  },
};
</script>

<style lang="scss" scoped>
  .user-content{
    flex-direction: column;
    width: 50vw;
    position: absolute;
    top: 70px;
    bottom: 80px;
  }

  .user-controls{
    flex-direction: row;
    border-bottom: 1px solid white;
    height: 50px;
    justify-content: flex-end;
  }

  .upload-logo{
    align-self: center;
    width: 24px;
    padding: 0 6px;
    cursor: pointer;

    &:hover{
      transform: scale(1.1);
    }
  }
</style>
