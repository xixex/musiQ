<template>
  <div id="app">
    <page-header
      @showSignIn="showSignIn"
      @showSignUp="showSignUp"
    />
    <navigation-bar />
    <user-content @openNewTrackForm="showNewTrackForm" />
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
  </div>
</template>

<script>
import UserContent from '@/components/user-content/UserContent';
import AudioPlayer from '@/components/AudioPlayer';
import PageHeader from '@/components/page-header/PageHeader';
import SignInForm from '@/components/SignInForm';
import SignUpForm from '@/components/SignUpForm';
import { mapActions } from 'vuex';
import { ACTION_CHECK_IF_AUTHORIZED } from '@/store/modules/auth';
import NavigationBar from '@/components/user-content/NavigationBar';
import NewTrackForm from '@/components/NewTrackForm';

export default {

  components: {
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
    };
  },

  mounted() {
    this.ACTION_CHECK_IF_AUTHORIZED();
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

    ...mapActions({
      ACTION_CHECK_IF_AUTHORIZED,
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
