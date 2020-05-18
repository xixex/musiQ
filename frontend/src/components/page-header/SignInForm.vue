<template>
  <modal @close="closeForm">
    <form
      class="form"
      @submit.prevent="signIn"
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
import { ACTION_SIGN_IN } from '@/store/modules/auth';

export default {
  components: {
    Modal,
  },

  data() {
    return {
      email: '',
      password: '',
    };
  },

  methods: {
    signIn() {
      this.ACTION_SIGN_IN({
        email: this.email, password: this.password,
      })
        .then(() => {
          this.closeForm();
        });
    },

    closeForm() {
      this.$emit('close');
    },

    ...mapActions({
      ACTION_SIGN_IN,
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
