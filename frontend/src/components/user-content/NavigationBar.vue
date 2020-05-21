<template>
  <div class="nav-content">
    <div class="link-wrapper">
      <router-link
        v-if="isAuthorised"
        to="/my-music"
        class="nav-item"
        v-text="'My music'"
      />
    </div>
    <div class="link-wrapper">
      <router-link
        v-if="isAuthorised"
        to="/playlists"
        class="nav-item"
        v-text="'My Playlists'"
      />
    </div>
    <div class="link-wrapper">
      <router-link
        to="/popular"
        class="nav-item"
        v-text="'Popular'"
      />
    </div>
    <!--    <div class="link-wrapper">-->
    <!--      <router-link-->
    <!--        v-if="isAuthorised"-->
    <!--        to="/recent"-->
    <!--        class="nav-item"-->
    <!--        v-text="'Recently listened'"-->
    <!--      />-->
    <!--    </div>-->
  </div>
</template>

<script>

import { mapState } from 'vuex';

export default {
  components: {

  },

  computed: {
    ...mapState({
      isAuthorised: (state) => state.auth.isAuthorised,
    }),
  },
};
</script>

<style lang="scss" scoped>
  @import "~assets/main.scss";

  .nav-content{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    left: 0;
    height: 100%;
    width: 200px;
    position: absolute;
    top: 70px;
    bottom: 80px;
    align-items: flex-start;
    background: #34393f;
    box-shadow:  12px 12px 25px #2e3338,
    -12px -12px 25px #3a3f46;
    border-radius: 20px;
    padding: 24px 10px;
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
</style>
