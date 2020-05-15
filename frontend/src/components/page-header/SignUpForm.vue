<template>
  <form
    class="form"
    @submit.prevent="signUp"
  >
    <label
      class="label"
      for="sign-in-email"
      v-text="'Email'"
    />
    <input
      id="sign-in-email"
      v-model="email"
      type="text"
      class="form-input"
    >
    <label
      class="label"
      for="sign-in-name"
      v-text="'Name'"
    />
    <input
      id="sign-in-name"
      v-model="userName"
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
      v-model="password"
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
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      userName: '',
      password: '',
    };
  },

  methods: {
    signUp() {
      axios.post('http://localhost:8080/auth/signup', {
        email: this.email,
        name: this.userName,
        password: this.password,
      })
        .then((response) => {
          console.log(response);
        });
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
