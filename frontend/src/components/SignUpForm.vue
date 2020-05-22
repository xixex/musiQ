<template>
  <modal @close="closeForm">
    <div class="box">
      <h2>Sign In</h2>
      <form @submit.prevent="signUp">
        <div class="inputBox">
          <input
            v-model="email"
            required
            value=""
          >
          <label>Email</label>
        </div>
        <div class="inputBox">
          <input
            v-model="userName"
            required
            value=""
          >
          <label>Username</label>
        </div>
        <div class="inputBox">
          <input
            v-model="password"
            type="password"
            required
            value=""
          >
          <label>Password</label>
        </div>
        <input
          type="submit"
          name="sign-in"
          value="OK"
        >
      </form>
    </div>
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
  @import "~assets/main.scss";

  .box {
    position: absolute;
    flex-direction: column;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 25rem;
    padding: 2.5rem;
    box-sizing: border-box;
    background: $gray1;
    border-radius: 10px;
    border: 4px solid $gray1;
    box-shadow:  7px 7px 14px #000000,
    -7px -7px 14px #000000;;
  }

  .box h2 {
    margin: 0 0 1.875rem;
    padding: 0;
    color: #fff;
    text-align: center;
  }

  .box .inputBox {
    position: relative;
  }

  .box .inputBox input {
    width: 100%;
    padding: 0.625rem 0;
    font-size: 1rem;
    color: #fff;
    letter-spacing: 0.062rem;
    margin-bottom: 1.875rem;
    border: none;
    border-bottom: 0.065rem solid #fff;
    outline: none;
    background: transparent;
  }

  .box .inputBox label {
    position: absolute;
    top: 0;
    left: 0;
    padding: 0.625rem 0;
    font-size: 1rem;
    color: #fff;
    pointer-events: none;
    transition: 0.5s;
  }

  .box .inputBox input:focus ~ label,
  .box .inputBox input:valid ~ label,
  .box .inputBox input:not([value=""]) ~ label {
    top: -1.125rem;
    left: 0;
    color: $green-color;
    font-size: 0.75rem;
  }

  .box input[type="submit"] {
    border: none;
    outline: none;
    color: white;
    padding: 0.625rem 1.25rem;
    cursor: pointer;
    border-radius: 0.312rem;
    font-size: 10px;
    font-weight: bold;
    width: 100%;
    background: linear-gradient(145deg, #383d43, #2f3339);
    box-shadow:  7px 7px 14px #282b30,
    -7px -7px 14px #40474e;
  }

  @media only screen and (max-width: 1919px) {
    .box {
      padding: 24px;
      width: 80%;
    }

    .box h2{
      margin-bottom: 10px;
    }
  }

</style>
