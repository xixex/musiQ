<template>
  <div class="user-content">
    <div class="user-controls">
      <template v-if="isAuthorised">
        <div
          class="control"
          @click="openNewPlaylistForm"
        >
          <img
            class="upload-logo"
            src="@/assets/addplaylist.svg"
            alt=""
          >
        </div>
        <div
          class="control"
          @click="openNewTrackForm"
        >
          <img
            :src="require('@/assets/upload.svg')"
            class="upload-logo"
            alt=""
          >
        </div>
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
    position: relative;
    flex-direction: column;
    width: 50vw;
    height: 100%;
    border-left: 2px solid #30353b;
    padding: 24px 36px;
    background: #34393f;
  }

  .user-controls{
    flex-direction: row;
    height: 50px;
    justify-content: flex-end;
    align-items: center;
    padding: 0 12px;
  }

  .control{
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    margin-left: 14px;
    cursor: pointer;
    border-radius: 50%;
    background: linear-gradient(145deg, #3f484e, #26282e);
    box-shadow:  4px 4px 8px #25292d,
    -4px -4px 8px #434951;
    position: relative;

    &:after{
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      border: 2px solid #34363c;
    }

    &:hover{
      transform: scale(1.1);
    }
  }

  .upload-logo{
    align-self: center;
    width: 14px;
  }

  @media only screen and (max-width: 1919px) {

    .user-content{
      width: 70vw;
      padding: 24px 24px;
      background: #34393f;
    }
  }

</style>
