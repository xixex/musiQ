<template>
  <div class="playlists-wrapper">
    <search-bar />
    <div class="playlist-list">
      <playlist-card
        v-for="(plist,i) in allMyPlaylists"
        :key="i"
        :playlist="plist"
        @click.native="openPlaylist(plist)"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { ACTION_UPDATE_ALL_MY_PLAYLISTS } from '@/store/modules/playlists';
import SearchBar from '@/components/user-content/SearchBar';
import PlaylistCard from '@/components/common/PlaylistCard';

export default {
  components: {
    SearchBar,
    PlaylistCard,
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
      this.$emit('openPlaylist', playlist);
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "~assets/main.scss";

  .playlists-wrapper{
    display: flex;
    flex-direction: column;
  }

  .playlist-list{
    width: 100%;
    flex-direction: row;
    flex-wrap: wrap;
  }


</style>
