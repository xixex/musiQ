import Vue from 'vue';
import VueRouter from 'vue-router';
import MyMusic from '@/components/user-content/section-my-music/MyMusic';
import Playlists from '@/components/user-content/section-playlists/Playlists';
import Popular from '@/components/user-content/section-popular/Popular';
import Recent from '@/components/user-content/section-recent/Recent';
import axios from 'axios';
import { checkIfAuthorised } from '@/helpers/tokenHelper';

Vue.use(VueRouter);

const routes = [
  {
    path: '/my-music',
    component: MyMusic,
    beforeEnter: (to, from, next) => {
      checkIfAuthorised()
        .then(() => {
          next();
        })
        .catch(() => {
          console.log('aaa')
          next('/popular');
        });
    },
  },
  {
    path: '/playlists',
    component: Playlists,
    beforeEnter: (to, from, next) => {
      checkIfAuthorised()
        .then(() => {
          next();
        })
        .catch(() => {
          next('/popular');
        });
    },
  },
  {
    path: '/popular',
    component: Popular,
  },
  {
    path: '/recent',
    component: Recent,
    beforeEnter: (to, from, next) => {
      checkIfAuthorised()
        .then(() => {
          next();
        })
        .catch(() => {
          next('/popular');
        });
    },
  },
  { path: '*', redirect: '/popular' },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
