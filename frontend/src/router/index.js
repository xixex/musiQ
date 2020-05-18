import Vue from 'vue';
import VueRouter from 'vue-router';
import MyMusic from '@/components/user-content/section-my-music/MyMusic';
import Playlists from '@/components/user-content/section-playlists/Playlists';
import Popular from '@/components/user-content/section-popular/Popular';
import Recent from '@/components/user-content/section-recent/Recent';
import axios from 'axios';
import { ACTIONS_SIGN_OUT, MUTATION_SIGN_IN } from '@/store/modules/auth';

Vue.use(VueRouter);

const routes = [
  {
    path: '/my-music',
    component: MyMusic,
  },
  {
    path: '/playlists',
    component: Playlists,
  },
  {
    path: '/popular',
    component: Popular,
  },
  {
    path: '/recent',
    component: Recent,
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
