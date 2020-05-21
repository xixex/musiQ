import axios from 'axios';
import { checkIfAuthorised } from '@/helpers/tokenHelper';
import router from '@/router';

export const MUTATION_SIGN_IN = 'MUTATION_SIGN_IN';
export const MUTATION_SIGN_OUT = 'MUTATION_SIGN_OUT';

export const ACTION_SIGN_UP = 'ACTION_SIGN_UP';
export const ACTION_SIGN_IN = 'ACTION_SIGN_IN';
export const ACTION_SIGN_OUT = 'ACTION_SIGN_OUT';
export const ACTION_CHECK_IF_AUTHORIZED = 'ACTION_CHECK_IF_AUTHORIZED';

export default {
  state: () => ({
    isAuthorised: false,
  }),

  mutations: {
    [MUTATION_SIGN_IN](state, { accessToken, refreshToken }) {
      localStorage.setItem('access_token', `Bearer ${accessToken}`);
      localStorage.setItem('refresh_token', `${refreshToken}`);
      state.isAuthorised = true;
    },

    [MUTATION_SIGN_OUT](state) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      state.isAuthorised = false;
      router.go('/popular');
    },
  },

  actions: {
    [ACTION_SIGN_UP]({ dispatch }, { email, name, password }) {
      return axios.post(`${window.hostname}/auth/signup`, {
        email,
        name,
        password,
      })
        .then(() => {
          dispatch(ACTION_SIGN_IN, { email, password });
        });
    },

    [ACTION_SIGN_IN]({ commit }, { email, password }) {
      return axios.post(`${window.hostname}/auth/signin`, {
        email,
        password,
      })
        .then((response) => {
          commit(MUTATION_SIGN_IN, {
            accessToken: response.data.access_token,
            refreshToken: response.data.refresh_token,
          });
        });
    },

    [ACTION_SIGN_OUT]({ commit }) {
      const refreshToken = localStorage.getItem('refresh_token');

      return axios.delete(`${window.hostname}/auth/signout`, {
        data: {
          refresh_token: refreshToken,
        },
      })
        .then(() => {
          commit(MUTATION_SIGN_OUT);
        });
    },

    [ACTION_CHECK_IF_AUTHORIZED]({ commit, dispatch }) {
      return checkIfAuthorised()
        .then((data) => {
          commit(MUTATION_SIGN_IN, {
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
          });
        })
        .catch(() => {
          dispatch(ACTION_SIGN_OUT);
        });
    },
  },
};
