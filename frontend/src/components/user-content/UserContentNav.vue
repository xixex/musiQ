<template>
  <div class="nav-content">
    <router-link
      to="/my-music"
      class="nav-item"
      v-text="'My music'"
    />
    <router-link
      to="/playlists"
      class="nav-item"
      v-text="'Playlists'"
    />
    <router-link
      to="/popular"
      class="nav-item"
      v-text="'Popular'"
    />
    <router-link
      to="/recent"
      class="nav-item"
      v-text="'Recently listened'"
    />
  </div>
</template>

<script>

export default {
  components: {

  },
};
</script>

<style lang="scss" scoped>
  .nav-content{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    border: 1px solid pink;
    height: 80px;
  }

  .nav-item{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: max-content;
    padding: 20px;
    text-decoration: none;
    color: black;
  }
</style>
