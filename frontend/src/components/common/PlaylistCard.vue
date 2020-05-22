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
    overflow: visible;
    z-index: 5;
  }

  .playlist{
    position:  absolute;
    width: 90%;
    height: 90%;
    top: 5%;
    left: 5%;
    overflow: hidden;
    cursor: pointer;
    padding: 20px;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    background: #34393f;
    box-shadow:  5px 5px 10px #2c3036,
    -5px -5px 10px #3c4248;
  }

  .title{
    font-weight: bold;
    font-size: 12px;
    margin-top: auto;
    margin-right: auto;
    text-align: left;
    align-self: flex-start;
    width: 50%;
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

  /*@media only screen and (max-width: 1919px) {*/
  /*  .playlist-wrapper{*/
  /*    width: 25%;*/
  /*    padding-top: 25%;*/
  /*  }*/
  /*}*/

  /*@media only screen and (max-width: 1439px) {*/
  /*  .playlist-wrapper{*/
  /*    width: calc(100% / 3);*/
  /*    padding-top: calc(100% / 3);*/
  /*  }*/
  /*}*/
</style>
