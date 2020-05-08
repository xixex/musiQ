<template>
  <div class="user-content">
    <user-content-nav />
    <user-content-search />
    <router-view />
  </div>
</template>

<script>
import UserContentNav from '@/components/user-content/UserContentNav';
import UserContentSearch from '@/components/user-content/UserContentSearch';

export default {
  components: {
    UserContentSearch,
    UserContentNav,
  },
};
</script>

<style lang="scss" scoped>

</style>
