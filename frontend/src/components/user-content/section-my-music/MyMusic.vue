<template>
  <div class="my-music">
    <div
      v-for="(track,i) in tracks"
      :key="i"
      @click="playTrack(track.src)"
    >
      <button
        @click="playTrack(track)"
        v-text="'Play'"
      />
      <button
        @click="trackStop"
        v-text="'Stop'"
      />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Hls from 'hls.js';

export default {
  components: {

  },

  data() {
    return {
      tracks: null,
      audio: null,
    };
  },

  mounted() {
    axios.get('http://localhost:8080/api/audio/tracks')
      .then((res) => {
        this.tracks = res.data;
        console.log(res);
      });
  },

  methods: {
    playTrack(track) {
      console.log(track);
      const audio = new Audio();
      const audioSrc = `http://localhost:8080/media/${track.id}/stream/`;
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(audioSrc);
        hls.attachMedia(audio);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          audio.play();
        });
      }
    },

    trackStop() {
      console.log(this.audio);
      this.audio.pause();
    },

  },
};
</script>

<style lang="scss" scoped>

</style>
