<template>
  <div
    class="control"
  >
    <img
      class="upload-logo"
      :src="logo"
      alt=""
    >
  </div>
</template>

<script>
export default {
  props: {
    logo: {

    },
  },
};
</script>

<style scoped lang="scss">

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

  .upload-logo{
    align-self: center;
    width: 14px;
  }
</style>
