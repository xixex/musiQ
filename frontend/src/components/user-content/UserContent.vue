<template>
  <div class="user-content">
    <div class="user-controls">
      <h2
        class="header-text"
        v-text="headerText"
      />
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
  },
};
</script>

<style lang="scss" scoped>
  .user-content{
    flex-direction: column;
    width: 50vw;
    position: absolute;
    top: 70px;
    bottom: 90px;
  }

  .header-text{
    margin-right: auto;
  }

  .user-controls{
    flex-direction: row;
    border-bottom: 1px solid white;
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
