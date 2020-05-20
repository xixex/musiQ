<template>
  <div class="my-playlists">
    <playlist-list
      :playlists="allMyPlaylists"
      @openPlaylist="openPlaylist"
    />
    <listen-playlist-form
      v-if="isPlaylistOpened"
      :playlist="currentPlaylist"
      @close="closePlaylist"
    />
  </div>
</template>

<script>

import PlaylistList from '@/components/common/PlaylistList';
import { mapActions, mapState } from 'vuex';
import { ACTION_UPDATE_ALL_MY_PLAYLISTS } from '@/store/modules/playlists';
import ListenPlaylistForm from '@/components/user-content/section-playlists/ListenPlaylistForm';
import { prepareTracksNextPrev } from '@/helpers/tracksHelper';

export default {
  components: {
    ListenPlaylistForm,
    PlaylistList,
  },

  data() {
    return {
      isPlaylistOpened: false,
      currentPlaylist: null,
    };
  },

  computed: {
    ...mapState({
      allMyPlaylists: (state) => state.playlists.allMyPlaylists,
    }),
  },

  mounted() {
    this.ACTION_UPDATE_ALL_MY_PLAYLISTS();
  },

  methods: {
    ...mapActions({
      ACTION_UPDATE_ALL_MY_PLAYLISTS,
    }),

    openPlaylist(playlist) {
      this.currentPlaylist = playlist;
      this.isPlaylistOpened = true;
    },

    closePlaylist() {
      this.isPlaylistOpened = false;
    },
  },
};
</script>

<style lang="scss" scoped>
  .my-playlists{
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow-y: scroll;
  }

</style>
