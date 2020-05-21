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
    padding: 0 20px;
    width: calc(100% - 20px);
    box-sizing: border-box;
    background: transparent;
    outline: none;
    border: none;
    border-radius: 5px;
    margin: 10px 0;
    color: white;
    font-size: 14px;
    flex-shrink: 0;
    box-shadow: inset 5px 5px 10px #2e3237,
    inset -5px -5px 10px #3a4047;
    align-self: center;
  }
</style>
