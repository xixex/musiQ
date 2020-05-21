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
  }

  .nav-item{
    display: flex;
    box-sizing: border-box;
    justify-content: flex-end;
    align-items: center;
    height: 50px;
    width: 100%;
    padding: 20px;
    text-decoration: none;
    text-transform: uppercase;
    color: white;
    text-align: left;
    white-space: nowrap;
    font-size: 12px;
    font-weight: bold;

    &.router-link-active{
      border-bottom: 1px solid white;
      color: #24FE41;
    }
  }

  .link-wrapper{
    width: 100%;

    &:hover{
      background: rgba(255,255,255,0.02);
    }
  }
</style>
