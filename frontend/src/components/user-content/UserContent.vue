<template>
  <div class="user-content">
    <router-view />
  </div>
</template>

<script>

  export default {
  components: {

  },
};
</script>

<style lang="scss" scoped>
  .user-content{
    flex-direction: column;
    width: 50vw;
  }
</style>
