<template>
  <form
    class="form"
    @submit="signIn"
  >
    <label
      class="label"
      for="sign-in-email"
      v-text="'Email'"
    />
    <input
      id="sign-in-email"
      type="text"
      class="form-input"
    >
    <label
      class="label"
      for="sign-in-password"
      v-text="'Password'"
    />
    <input
      id="sign-in-password"
      type="password"
      class="form-input"
    >
    <input
      type="submit"
      class="form-btn"
      value="Sign In"
    >
  </form>
</template>

<script>
export default {
  methods: {
    signIn() {

    },
  },
};
</script>

<style lang="scss" scoped>

  .form{
    width: 200px;
    align-items: flex-start;
    background: pink;
  }

  .form-input{
    width: 100%;
  }

  .label{
    font-size: 12px;
  }

  .form-btn{
    align-self: center;
  }

</style>
