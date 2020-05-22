<template>
  <div class="navbar-main">
    <div class="nav-content">
      <div class="navbar-header">
        <img
          :src="require('@/assets/logo.png')"
          alt=""
          class="app-logo"
        >
      </div>
      <div
        class="link-wrapper"
        @click="hideNav"
      >
        <router-link
          v-if="isAuthorized"
          to="/my-music"
          class="nav-item"
          v-text="'My music'"
        />
      </div>
      <div
        class="link-wrapper"
        @click="hideNav"
      >
        <router-link
          v-if="isAuthorized"
          to="/playlists"
          class="nav-item"
          v-text="'My Playlists'"
        />
      </div>
      <div
        class="link-wrapper"
        @click="hideNav"
      >
        <router-link
          to="/popular"
          class="nav-item"
          v-text="'Popular'"
        />
      </div>
      <!--    <div class="link-wrapper">-->
      <!--      <router-link-->
      <!--        v-if="isAuthorized"-->
      <!--        to="/recent"-->
      <!--        class="nav-item"-->
      <!--        v-text="'Recently listened'"-->
      <!--      />-->
      <!--    </div>-->
      <button-control
        v-if="isAuthorized"
        :logo="require('@/assets/logout.svg')"
        class="logout"
        @click.native="logOut"
      />
    </div>
    <div
      class="closer"
      @click="hideNav"
    />
  </div>
</template>

<script>

import { mapActions, mapState } from 'vuex';
import ButtonControl from '@/components/common/ButtonControl';
import { ACTION_SIGN_OUT } from '@/store/modules/auth';

export default {
  components: {
    ButtonControl,
  },

  computed: {
    ...mapState({
      isAuthorized: (state) => state.auth.isAuthorized,
    }),
  },

  methods: {
    ...mapActions({
      ACTION_SIGN_OUT,
    }),

    hideNav() {
      this.$emit('hideNav');
    },

    logOut() {
      this.ACTION_SIGN_OUT();
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "~assets/main.scss";

  .closer{
    display: none;
  }

  .navbar-main{
    height: 100%;
    left: 0;
  }

  .nav-content{
    display: flex;
    position: relative;
    flex-direction: column;
    justify-content: flex-start;
    left: 0;
    height: 100%;
    width: 200px;
    align-items: flex-start;
    background: #34393f;
    padding: 20px 20px;
  }

  .nav-item{
    display: flex;
    box-sizing: border-box;
    justify-content: flex-start;
    align-items: center;
    height: 40px;
    width: 100%;
    padding: 20px 30px;
    text-decoration: none;
    color: white;
    text-align: left;
    white-space: nowrap;
    font-size: 12px;
    border-radius: 8px;
    font-weight: bold;

    &.router-link-active{
      color: $green-color;
      background: #34393f;
      box-shadow: inset 5px 5px 5px #31363b,
      inset -5px -5px 5px #373c43;
    }
  }

  .link-wrapper{
    width: 100%;

    &:hover{
      border-radius: 8px;
      background: rgba(255,255,255,0.02);
    }
  }

  .navbar-header{
    height: 50px;
  }

  .app-logo{
    height: 30px;
  }

  .logout{
    align-self: flex-start;
    margin-top: auto;
    margin-left: 4px;
  }

  @media only screen and (max-width: 1023px) {
    .nav-content{
      width: 70vw;
      -webkit-box-shadow: 26px 0px 91px 0px rgba(0,0,0,0.75);
      -moz-box-shadow: 26px 0px 91px 0px rgba(0,0,0,0.75);
      box-shadow: 26px 0px 91px 0px rgba(0,0,0,0.75);
      padding-bottom: 80px;
    }

    .closer{
      display: flex;
      position: absolute;
      width: 100vw;
      height: 100vh;
      top:0;
      left: 0;
      background: transparent;
      z-index: -1;
    }
  }
</style>
