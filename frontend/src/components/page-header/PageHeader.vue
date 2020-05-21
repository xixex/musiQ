<template>
  <div class="page-header">
    <h2
      class="header-text"
      v-text="headerText"
    />
    <img
      :src="require('@/assets/logo.png')"
      alt=""
      class="logo"
    >
    <template v-if="isAuthorised">
      <div
        class="control"
        @click="logOut"
      >
        <img
          alt=""
          src="@/assets/logout.svg"
          class="logout"
        >
      </div>
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

    headerText() {
      switch (this.$route.path) {
        case '/my-music':
          return 'My music';
        case '/playlists':
          return 'My Playlists';
        case '/recent':
          return 'Recently Listened';
        case '/popular':
          return 'Popular';
        default:
          return '';
      }
    },
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
    justify-content: flex-end;
    padding: 14px 32px;
  }

  .header-text{
    text-transform: uppercase;
    font-weight: bold;
    margin-right: auto;
    position: absolute;
    font-size: 80px;
    white-space: nowrap;
    left: 240px;
    top: -40px;
  }

  .logo{
    width: 100px;
    margin-right: auto;
  }

  .control{
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    margin-left: 14px;
    cursor: pointer;
    border-radius: 50%;
    background: linear-gradient(145deg, #3f484e, #26282e);
    box-shadow:  4px 4px 8px #25292d,
    -4px -4px 8px #434951;
    position: relative;

    &:after{
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      border: 2px solid #34363c;
    }

    &:hover{
      transform: scale(1.1);
    }
  }

  .logout{
    width: 14px;
  }

  .sign-btn{
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    text-align: center;
    padding: 0 10px;
    font-weight: bold;
    margin-right: 10px;
    width: 90px;
    cursor: pointer;
    font-size: 14px;
    background: linear-gradient(145deg, #383d43, #2f3339);
    box-shadow:  5px 5px 16px #282c31,
    -5px -5px 16px #40464d;

    &:hover{
      border: 1px solid #34363c;
      background: rgba(255,255,255,0.1);
    }
  }
</style>
