<template>
  <div id="app">
    <page-header
      @showSignIn="showSignIn"
      @showSignUp="showSignUp"
    />
    <audio-player />
    <user-content />
    <modal
      v-if="isShowSignIn"
      @close="hideSignIn"
    >
      <sign-in-form />
    </modal>
    <modal
      v-if="isShowSignUp"
      @close="hideSignUp"
    >
      <sign-up-form />
    </modal>
  </div>
</template>

<script>
import UserContent from '@/components/user-content/UserContent';
import AudioPlayer from '@/components/AudioPlayer';
import PageHeader from '@/components/page-header/PageHeader';
import SignInForm from '@/components/page-header/SignInForm';
import SignUpForm from '@/components/page-header/SignUpForm';
import Modal from '@/components/common/Modal';

export default {

  components: {
    UserContent,
    PageHeader,
    AudioPlayer,
    SignInForm,
    SignUpForm,
    Modal,
  },

  data() {
    return {
      isShowSignIn: false,
      isShowSignUp: false,
    };
  },

  mounted() {
    if (localStorage.getItem('auth')) {
      this.$store.commit('SET_AUTHORISED', true);
    }
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
  .sign-in-form{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
