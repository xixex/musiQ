<template>
  <div id="app">
    <page-header
      @showSignIn="showSignIn"
      @showSignUp="showSignUp"
    />
    <navigation-bar />
    <user-content
      @openNewTrackForm="showNewTrackForm"
      @openNewPlaylistForm="showNewPlaylistForm"
    />
    <audio-player />
    <sign-in-form
      v-if="isShowSignIn"
      @close="hideSignIn"
    />
    <sign-up-form
      v-if="isShowSignUp"
      @close="hideSignUp"
    />
    <new-track-form
      v-if="isShowNewTrackForm"
      @close="hideNewTrackForm"
    />
    <new-playlist-form
      v-if="isShowNewPlaylistForm"
      @close="hideNewPlaylistForm"
    />
  </div>
</template>

<script>
import UserContent from '@/components/user-content/UserContent';
import AudioPlayer from '@/components/AudioPlayer';
import PageHeader from '@/components/page-header/PageHeader';
import SignInForm from '@/components/SignInForm';
import SignUpForm from '@/components/SignUpForm';
import { mapActions, mapState } from 'vuex';
import { ACTION_CHECK_IF_AUTHORIZED } from '@/store/modules/auth';
import NavigationBar from '@/components/user-content/NavigationBar';
import NewTrackForm from '@/components/NewTrackForm';
import { ACTION_UPDATE_ALL_MY_TRACKS } from '@/store/modules/myMusic';
import NewPlaylistForm from '@/components/NewPlaylistForm';

export default {

  components: {
    NewPlaylistForm,
    NewTrackForm,
    NavigationBar,
    UserContent,
    PageHeader,
    AudioPlayer,
    SignInForm,
    SignUpForm,
  },

  data() {
    return {
      isShowSignIn: false,
      isShowSignUp: false,
      isShowNewTrackForm: false,
      isShowNewPlaylistForm: false,
    };
  },

  computed: {
    ...mapState({
      isAuthorised: (state) => state.auth.isAuthorised,
    }),
  },

  mounted() {
    this.ACTION_CHECK_IF_AUTHORIZED()
      .then(() => {
        if (this.isAuthorised) {
          this.ACTION_UPDATE_ALL_MY_TRACKS();
        }
      });
  },

  methods: {
    showSignIn() {
      this.isShowSignIn = true;
    },

    hideSignIn() {
      this.isShowSignIn = false;
    },

    showSignUp() {
      this.isShowSignUp = true;
    },

    hideSignUp() {
      this.isShowSignUp = false;
    },

    showNewTrackForm() {
      this.isShowNewTrackForm = true;
    },

    hideNewTrackForm() {
      this.isShowNewTrackForm = false;
    },

    showNewPlaylistForm() {
      this.isShowNewPlaylistForm = true;
    },

    hideNewPlaylistForm() {
      this.isShowNewPlaylistForm = false;
    },

    ...mapActions({
      ACTION_CHECK_IF_AUTHORIZED,
      ACTION_UPDATE_ALL_MY_TRACKS,
    }),
  },
};

</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url('http://jellydemos.com/wordpress/decibel/wp-content/uploads/2018/08/intro-slide3.jpg');
  /*background: linear-gradient(65deg, #000, #03001e);*/
  height: 100vh;
}

body {
  margin: 0;
  font-family: "Open Sans", sans-serif !important;
  line-height: normal;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
}

div {
  display: flex;
  box-sizing: border-box;
  color: white;

  &::-webkit-scrollbar {
    display: none;
  }
}

</style>

<style lang="scss" scoped>

  .sign-in-form{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
