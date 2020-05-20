<template>
  <input
    class="search"
    placeholder="Search"
  >
</template>

<script>

export default {
  components: {

  },
};
</script>

<style lang="scss" scoped>
  .search{
    height: 35px;
    justify-content: center;
    align-items: flex-start;
    padding: 0 10px;
    width: 100%;
    box-sizing: border-box;
    background: transparent;
    outline: none;
    border: 1px solid white;
    border-radius: 5px;
    margin: 10px 0;
    color: white;
    font-size: 14px;
    flex-shrink: 0;
  }
</style>
