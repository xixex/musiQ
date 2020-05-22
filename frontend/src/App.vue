<template>
  <div id="app">
    <page-header
      class="page-header"
      @showSignIn="showSignIn"
      @showSignUp="showSignUp"
    />
    <div class="nav-with-content">
      <navigation-bar
        v-if="isShowNavigation"
        @hideNav="hideNav"
        class="nav-bar"
      />
      <user-content
        @click.native="hideNav"
        @openNewTrackForm="showNewTrackForm"
        @openNewPlaylistForm="showNewPlaylistForm"
        @openNav="openNav"
      />
    </div>
    <audio-player class="audio-player" />
    <sign-in-form
      v-if="isShowSignIn"
      @close="hideSignIn"
    />
    <sign-up-form
      v-if="isShowSignUp"
      @close="hideSignUp"
    />
    <new-track-form
      v-if="isShowNewTrackForm"
      @close="hideNewTrackForm"
    />
    <new-playlist-form
      v-if="isShowNewPlaylistForm"
      @close="hideNewPlaylistForm"
    />
    <audio-player-mobile />
  </div>
</template>

<script>
import UserContent from '@/components/user-content/UserContent';
import AudioPlayer from '@/components/AudioPlayer';
import PageHeader from '@/components/page-header/PageHeader';
import SignInForm from '@/components/SignInForm';
import SignUpForm from '@/components/SignUpForm';
import { mapActions, mapMutations, mapState } from 'vuex';
import { ACTION_CHECK_IF_AUTHORIZED } from '@/store/modules/auth';
import NavigationBar from '@/components/user-content/NavigationBar';
import NewTrackForm from '@/components/NewTrackForm';
import { ACTION_UPDATE_ALL_MY_TRACKS } from '@/store/modules/myMusic';
import NewPlaylistForm from '@/components/NewPlaylistForm';
import { MUTATION_SET_WINDOW_WIDTH } from '@/store';
import AudioPlayerMobile from '@/components/AudioPlayerMobile';

export default {

  components: {
    AudioPlayerMobile,
    NewPlaylistForm,
    NewTrackForm,
    NavigationBar,
    UserContent,
    PageHeader,
    AudioPlayer,
    SignInForm,
    SignUpForm,
  },

  data() {
    return {
      isShowSignIn: false,
      isShowSignUp: false,
      isShowNewTrackForm: false,
      isShowNewPlaylistForm: false,
      isShowNavigationMobile: false,
    };
  },

  computed: {
    ...mapState({
      isAuthorised: (state) => state.auth.isAuthorised,
      windowWidth: (state) => state.windowWidth,
    }),

    isShowNavigation() {
      if (this.windowWidth < 1024 && !this.isShowNavigationMobile) {
        return false;
      }

      return true;
    },
  },

  created() {
    window.addEventListener('resize', this.windowResize);
  },

  destroyed() {
    window.removeEventListener('resize', this.windowResize);
  },

  mounted() {
    this.ACTION_CHECK_IF_AUTHORIZED()
      .then(() => {
        if (this.isAuthorised) {
          this.ACTION_UPDATE_ALL_MY_TRACKS();
        }
      });

    this.$nextTick(() => {
      this.MUTATION_SET_WINDOW_WIDTH({ width: document.documentElement.clientWidth });
    });
  },

  methods: {
    ...mapActions({
      ACTION_CHECK_IF_AUTHORIZED,
      ACTION_UPDATE_ALL_MY_TRACKS,
    }),

    ...mapMutations({
      MUTATION_SET_WINDOW_WIDTH,
    }),

    windowResize() {
      this.MUTATION_SET_WINDOW_WIDTH({ width: document.documentElement.clientWidth });
    },

    showSignIn() {
      this.isShowSignIn = true;
    },

    hideSignIn() {
      this.isShowSignIn = false;
    },

    showSignUp() {
      this.isShowSignUp = true;
    },

    hideSignUp() {
      this.isShowSignUp = false;
    },

    showNewTrackForm() {
      this.isShowNewTrackForm = true;
    },

    hideNewTrackForm() {
      this.isShowNewTrackForm = false;
    },

    showNewPlaylistForm() {
      this.isShowNewPlaylistForm = true;
    },

    hideNewPlaylistForm() {
      this.isShowNewPlaylistForm = false;
    },

    openNav() {
      this.isShowNavigationMobile = true;
    },

    hideNav() {
      this.isShowNavigationMobile = false;
    },
  },
};

</script>

<style lang="scss">
  @import "~assets/main.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: $gray1;
  height: 100vh;
}

body {
  margin: 0;
  font-family: "Open Sans", sans-serif !important;
  line-height: normal;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
}

div {
  display: flex;
  box-sizing: border-box;
  color: white;

  &::-webkit-scrollbar {
    display: none;
  }
}

</style>

<style lang="scss" scoped>

  .sign-in-form{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .nav-with-content{
    width: max-content;
    justify-content: center;
    height: calc( 100% - 200px);
    border-radius: 25px;
    background: #34393f;
    overflow: hidden;
    box-shadow:  14px 14px 28px #2d3237,
    -14px -14px 28px #3b4047;
  }

  @media only screen and (max-width: 1023px) {

    .player-audio,
    .page-header{
      display: none;
    }

    .nav-with-content{
      width: 100%;
      height: 100%;
      border-radius: 25px;
    }

    .nav-bar{
      position: absolute;
      z-index: 20;
    }
  }
</style>
