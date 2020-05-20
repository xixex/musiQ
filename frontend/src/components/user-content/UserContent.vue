<template>
  <div class="user-content">
    <search-bar />
    <div class="user-controls">
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
  }

  .user-controls{
    flex-direction: row;
    border-bottom: 1px solid white;
    height: 50px;
  }

  .upload-logo{
    align-self: center;
    width: 24px;
    margin-left: auto;
    padding: 12px;
    cursor: pointer;

    &:hover{
      transform: scale(1.1);
    }
  }
</style>
