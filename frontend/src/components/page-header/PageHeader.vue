<template>
  <div class="page-header">
    <img
      :src="require('@/assets/logo.png')"
      alt=""
      class="logo"
    >
    <template v-if="isAuthorised">
      <img
        alt=""
        src="@/assets/logout.svg"
        class="sign-btn logout"
        @click="logOut"
      >
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
import { ACTION_SIGN_OUT } from '@/store/modules/auth';


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
      this.ACTION_SIGN_OUT();
    },

    ...mapActions({
      ACTION_SIGN_OUT,
    }),
  },
};
</script>

<style lang="scss" scoped>
  .page-header{
    flex-direction: row;
    box-sizing: border-box;
    width: 100%;
    height: 70px;
    justify-content: flex-end;
    padding: 15px 0;
  }

  .logo{
    width: 100px;
    margin-right: auto;
    padding: 0 10px;
  }

  .logout{
    width: 20px;
  }

  .sign-btn{
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    text-align: center;
    padding: 0 15px;
    margin-right: 10px;
    width: 90px;
    cursor: pointer;
    font-size: 14px;
    background: rgba(255,255,255,0.02);

    &:hover{
      background: rgba(255,255,255,0.1);
    }
  }
</style>
