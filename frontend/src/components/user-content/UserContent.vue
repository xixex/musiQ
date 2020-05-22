<template>
  <div class="user-content">
    <div class="user-controls">
      <div
        class="control nav"
        @click.stop="openNav"
      >
        <img
          class="nav-logo"
          src="@/assets/burger.svg"
          alt=""
        >
      </div>
      <template v-if="isAuthorised && windowWidth > 1023">
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
      windowWidth: (state) => state.windowWidth,
    }),

    headerText() {
      switch (this.$route.path) {
        case '/my-music':
          return 'My music';
        case '/playlists':
          return 'My Playlists';
        case '/recent':
          return 'Recently Listened';
        case '/popular':
          return 'Popular';
        default:
          return '';
      }
    },
  },

  methods: {
    openNewPlaylistForm() {
      this.$emit('openNewPlaylistForm');
    },

    openNewTrackForm() {
      this.$emit('openNewTrackForm');
    },

    openNav() {
      this.$emit('openNav');
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
    border-left: 2px solid $border-gray;
    padding: 24px 36px;
    background: #34393f;
  }

  .user-controls{
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    padding: 0 12px;
  }

  .headerText{
    margin-right: auto;
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

  .control.nav{
    margin-left: 0;
  }

  .nav-logo{
    width: 14px;
  }

  @media only screen and (max-width: 1919px) {

    .user-content{
      width: 70vw;
      padding: 24px 24px;
      background: #34393f;
    }
  }

  @media only screen and (max-width: 1023px) {

    .user-content{
      width: 100%;
    }

    .user-controls{
      padding: 20px 10px 24px;
      border-bottom: 2px solid $border-gray;

    }
  }

</style>
