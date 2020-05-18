<template>
  <modal @close="closeForm">
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
  </modal>
</template>

<script>

import { mapActions } from 'vuex';
import Modal from '@/components/common/Modal';
import { ACTION_SIGN_UP } from '@/store/modules/auth';

export default {
  components: {
    Modal,
  },

  data() {
    return {
      email: '',
      userName: '',
      password: '',
    };
  },

  methods: {
    signUp() {
      this.ACTION_SIGN_UP({
        email: this.email,
        name: this.userName,
        password: this.password,
      })
        .then(() => {
          this.closeForm();
        });
    },

    closeForm() {
      this.$emit('close');
    },

    ...mapActions({
      ACTION_SIGN_UP,
    }),
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
