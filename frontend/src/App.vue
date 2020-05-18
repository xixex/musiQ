<template>
  <div id="app">
    <page-header
      @showSignIn="showSignIn"
      @showSignUp="showSignUp"
    />
    <user-content />
    <audio-player />

    <sign-in-form
      v-if="isShowSignIn"
      @close="hideSignIn"
    />

    <sign-up-form
      v-if="isShowSignUp"
      @close="hideSignUp"
    />
  </div>
</template>

<script>
import UserContent from '@/components/user-content/UserContent';
import AudioPlayer from '@/components/AudioPlayer';
import PageHeader from '@/components/page-header/PageHeader';
import SignInForm from '@/components/page-header/SignInForm';
import SignUpForm from '@/components/page-header/SignUpForm';
import { mapActions } from 'vuex';
import { ACTION_REFRESH_TOKEN } from '@/store/modules/auth';

export default {

  components: {
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
    };
  },

  mounted() {
    this.ACTION_REFRESH_TOKEN();
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

    ...mapActions({
      ACTION_REFRESH_TOKEN,
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
  color: #2c3e50;
  width: 70vw;
  display: flex;
  flex-direction: column;
  align-items: center;
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
}

</style>

<style lang="scss" scoped>
  #app{
    height: 100vh;
  }

  .sign-in-form{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
