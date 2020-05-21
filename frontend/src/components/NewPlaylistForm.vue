<template>
  <modal @close="closeForm">
    <div class="box">
      <h2>Create Playlist</h2>
      <form
        ref="newPlaylist"
        class="form"
        @submit.prevent="addPlaylist"
      >
        <div class="inputBox">
          <input
            v-model="title"
            name="title"
            value=""
          >
          <label>Title</label>
        </div>
        <track-list
          class="track-list"
          :is-pickable="true"
          :tracks="allMyTracks"
          @pickTrack="pickTrack"
          @unpickTrack="unpickTrack"
        />
        <input
          :disabled="isButtonDisabled"
          type="submit"
          name="sign-in"
          value="OK"
          class="button-ok"
        >
      </form>
    </div>
  </modal>
</template>

<script>

import Modal from '@/components/common/Modal';
import TrackList from '@/components/common/TrackList';
import { mapActions, mapState } from 'vuex';
import { ACTION_CREATE_NEW_PLAYLIST } from '@/store/modules/playlists';
import { ACTION_UPDATE_ALL_MY_TRACKS } from '@/store/modules/myMusic';

export default {
  components: {
    TrackList,
    Modal,
  },

  data() {
    return {
      title: 'New Playlist',
      isButtonDisabled: false,
      tracksToAdd: [],
    };
  },

  computed: {
    ...mapState({
      allMyTracks: (state) => state.myMusic.allMyTracks,
    }),
  },

  mounted() {
    this.ACTION_UPDATE_ALL_MY_TRACKS();
  },

  methods: {
    ...mapActions({
      ACTION_CREATE_NEW_PLAYLIST,
      ACTION_UPDATE_ALL_MY_TRACKS,
    }),

    pickTrack(id) {
      this.tracksToAdd.push(id);
    },

    unpickTrack(id) {
      this.tracksToAdd = this.tracksToAdd.filter((e) => e !== id);
    },

    closeForm() {
      this.$emit('close');
    },

    addPlaylist() {
      this.isButtonDisabled = true;

      const formData = new FormData(this.$refs.newPlaylist);

      formData.append('tracklist', JSON.stringify(this.tracksToAdd));

      this.ACTION_CREATE_NEW_PLAYLIST({ playlist: formData })
        .then(() => {
          this.closeForm();
        });
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

  .box .inputBox {
    position: relative;
  }

  .box .inputBox input {
    width: 100%;
    padding: 0.625rem 0;
    font-size: 1rem;
    color: #fff;
    letter-spacing: 0.062rem;
    margin-bottom: 1.875rem;
    border: none;
    border-bottom: 0.065rem solid #fff;
    outline: none;
    background: transparent;
  }

  .box .inputBox label {
    position: absolute;
    top: 0;
    left: 0;
    padding: 0.625rem 0;
    font-size: 1rem;
    color: #fff;
    pointer-events: none;
    transition: 0.5s;
  }

  .box .inputBox input:focus ~ label,
  .box .inputBox input:valid ~ label,
  .box .inputBox input:not([value=""]) ~ label {
    top: -1.125rem;
    left: 0;
    color: $green-color;
    font-size: 0.75rem;
  }

  .box input[type="submit"] {
    border: none;
    outline: none;
    color: white;
    padding: 0.625rem 1.25rem;
    cursor: pointer;
    border-radius: 0.312rem;
    font-size: 10px;
    font-weight: bold;
    width: 100%;
    background: linear-gradient(145deg, #383d43, #2f3339);
    box-shadow:  7px 7px 14px #282b30,
    -7px -7px 14px #40474e;
  }

  .button-wrapper {
    position: relative;
    width: 100%;
    text-align: center;
    margin-bottom: 1.875rem;
  }

  .button-wrapper span.label {
    position: relative;
    z-index: 0;
    display: inline-block;
    background: transparent;
    cursor: pointer;
    color: #fff;
    padding: 10px 0;
    text-transform:uppercase;
    font-size:12px;
    border: 1px solid white;
    width: 100%;
    border-radius: 5px;
  }

  #upload {
    display: inline-block;
    position: absolute;
    box-sizing: border-box;
    z-index: 1;
    width: 100%;
    height: 50px;
    top: 0;
    left: 0;
    opacity: 0;
    cursor: pointer;
  }

  .button-ok:disabled{
    cursor: default !important;
    opacity: 0.2;
  }

  .form{
    height: 100%;
    padding: 10px 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
  }

  .track-list{
    position: absolute;
    top: 60px;
    bottom: 80px;
    right: 0;
    left: 0;
    box-sizing: border-box;
    width: 100%;
  }
</style>
