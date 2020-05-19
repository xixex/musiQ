<template>
  <div class="user-content">
    <user-content-search />
    <router-view />
  </div>
</template>

<script>
  import UserContentSearch from '@/components/user-content/UserContentSearch';

  export default {
  components: {
    UserContentSearch,
  },
};
</script>

<style lang="scss" scoped>
  .user-content{
    flex-direction: column;
    width: 50vw;
  }
</style>
