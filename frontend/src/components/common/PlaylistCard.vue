<template>
  <div
    class="playlist-wrapper"
  >
    <div class="playlist">
      <div
        class="title"
        v-text="playlist.title"
      />
      <img
        src=""
        alt=""
        class="background"
      >
      <img
        class="delete-icon"
        src="@/assets/delete.svg"
        alt=""
        @click.stop="removePlaylist"
      >
    </div>
  </div>
</template>

<script>

import { mapActions } from 'vuex';
import { ACTION_REMOVE_PLAYLIST } from '@/store/modules/playlists';

export default {
  props: {
    playlist: {
      required: true,
      default: null,
    },
  },

  methods: {
    ...mapActions({
      ACTION_REMOVE_PLAYLIST,
    }),

    removePlaylist() {
      this.ACTION_REMOVE_PLAYLIST({ id: this.playlist.id });
    },
  },
};

</script>

<style lang="scss" scoped>
  @import "~assets/main.scss";

  .playlist-wrapper{
    width: 20%;
    padding-top: 20%;
    position: relative;
    box-sizing: border-box;
    overflow: hidden;
  }

  .playlist{
    position:  absolute;
    width: 90%;
    height: 90%;
    top: 5%;
    left: 5%;
    border-radius: 10px;
    overflow: hidden;
    cursor: pointer;
    padding: 10px;
    background: linear-gradient(45deg, rgba(0, 0, 0, 0.7), rgba(67, 67, 67, 0.7));
    justify-content: center;
    align-items: center;
  }

  .title{
    font-weight: bold;
    font-size: 14px;
  }

  .background{
    position:  absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    justify-content: center;
    align-items: center;
  }

  .delete-icon{
    position: absolute;
    width: 14px;
    height: 14px;
    top: 12px;
    right: 12px;

    &:hover{
      transform: scale(1.2);
    }
  }
</style>
