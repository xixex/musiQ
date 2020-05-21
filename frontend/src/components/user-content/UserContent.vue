<template>
  <div class="user-content">
    <div class="user-controls">
      <template v-if="isAuthorised">
        <img
          class="upload-logo"
          src="@/assets/addplaylist.svg"
          alt=""
          @click="openNewPlaylistForm"
        >
        <img
          :src="require('@/assets/upload.svg')"
          class="upload-logo"
          alt=""
          @click="openNewTrackForm"
        >
      </template>
    </div>
    <router-view />
  </div>
</template>

<script>

import { mapState } from 'vuex';

export default {
  components: {

  },

  computed: {
    ...mapState({
      isAuthorised: (state) => state.auth.isAuthorised,
    }),
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
  @import "~assets/main.scss";

  .user-content{
    flex-direction: column;
    width: 50vw;
    height: 100%;
    border-radius: 5px;
    padding: 24px 36px 58px;
    background: #34393f;
    box-shadow:  14px 14px 23px #2d3237,
    -14px -14px 23px #3b4047;
  }

  .user-controls{
    flex-direction: row;
    height: 50px;
    justify-content: flex-end;
    align-items: center;
    padding: 0 12px;
  }

  .upload-logo{
    align-self: center;
    width: 24px;
    margin-left: 14px;
    cursor: pointer;

    &:hover{
      transform: scale(1.1);
    }
  }


</style>
