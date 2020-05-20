<template>
  <modal @close="closeForm">
    <div class="box">
      <h2>Add new Track</h2>
      <form
        ref="newTrack"
        @submit.prevent="uploadTrack"
      >
        <template v-if="isFileUploaded">
          <div class="inputBox">
            <input
              v-model="author"
              name="author"
              value=""
            >
            <label>Author</label>
          </div>
          <div class="inputBox">
            <input
              v-model="title"
              name="title"
              value=""
            >
            <label>Title</label>
          </div>
        </template>
        <div class="button-wrapper">
          <span
            class="label"
            v-text="uploadFilePlaceholder"
          />
          <input
            id="upload"
            required
            type="file"
            name="audiofile"
            class="upload-box"
            placeholder="Upload File"
            @change="fileUploadedFromComputer"
          >
        </div>
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

import { mapActions } from 'vuex';
import Modal from '@/components/common/Modal';
import { ACTION_SIGN_UP } from '@/store/modules/auth';
import axios from 'axios';

export default {
  components: {
    Modal,
  },

  data() {
    return {
      author: '',
      title: '',
      audiofile: null,
      isFileUploaded: false,
      isButtonDisabled: true,
      uploadFilePlaceholder: 'Upload audio',
    };
  },

  methods: {
    uploadTrack() {
      this.isButtonDisabled = true;

      const config = {
        headers: {
          Authorization: localStorage.getItem('access_token'),
        },
      };

      const data = new FormData(this.$refs.newTrack);

      axios.post(`${window.hostname}/api/audio/tracks`, data, config)
        .then((res) => {
          this.closeForm();
        });
    },

    fileUploadedFromComputer(event) {
      this.isFileUploaded = true;
      this.isButtonDisabled = false;
      this.audiofile = event.target.files[0];

      const [author, title] = this.audiofile.name.slice(0, -4).split('-');
      this.author = author;
      this.title = title;
      this.uploadFilePlaceholder = event.target.files[0].name;
    },

    closeForm() {
      this.$emit('close');
    },

    ...mapActions({
      ACTION_SIGN_UP,
    }),
  },
};
</script>

<style lang="scss" scoped>
  @import "~assets/main.scss";

  .box {
    position: absolute;
    flex-direction: column;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 25rem;
    padding: 2.5rem;
    box-sizing: border-box;
    background: rgba(0, 0, 0, 0.6);
    border-radius: 0.625rem;
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
    color: black;
    background: linear-gradient(90deg, $green-color, $green-color2);
    padding: 0.625rem 1.25rem;
    cursor: pointer;
    border-radius: 0.312rem;
    font-size: 12px;
    font-weight: bold;
    width: 100%;
  }

  .box input[type="submit"]:hover {
    background-color: #1cb1f5;
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
</style>
