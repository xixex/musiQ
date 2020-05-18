<template>
  <div class="page-header">
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Apple_Music_logo.svg/1200px-Apple_Music_logo.svg.png"
      alt=""
      class="logo"
    >
    <template v-if="isAuthorised">
      <div
        class="sign-btn"
        @click="logOut"
        v-text="'Log Out'"
      />
    </template>

    <template v-else>
      <div
        class="sign-btn"
        @click="showSignIn"
        v-text="'Sign In'"
      />
      <div
        class="sign-btn"
        @click="showSignUp"
        v-text="'Sign Up'"
      />
    </template>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { ACTIONS_SIGN_OUT } from '@/store/modules/auth';


export default {
  computed: {
    ...mapState({
      isAuthorised: (state) => state.auth.isAuthorised,
    }),
  },

  methods: {
    showSignIn() {
      this.$emit('showSignIn');
    },

    showSignUp() {
      this.$emit('showSignUp');
    },

    logOut() {
      this.ACTIONS_SIGN_OUT();
    },

    ...mapActions({
      ACTIONS_SIGN_OUT,
    }),
  },
};
</script>

<style lang="scss" scoped>
  .page-header{
    flex-direction: row;
    border: 1px solid red;
    box-sizing: border-box;
    width: 100%;
    height: 50px;
    justify-content: flex-end;
  }

  .sign-btn{
    width: max-content;
    height: 100%;
    justify-content: center;
    text-align: center;
    padding: 0 10px;
    border: 1px solid red;
    cursor: pointer;
  }

  .logo{
    width: 100px;
    margin-right: auto;
    padding: 0 10px;
  }
</style>
