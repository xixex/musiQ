<template>
  <div class="my-music">
    <div
      v-for="(track,i) in tracks"
      :key="i"
    >
      <audio-row :track="track" />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import AudioRow from '@/components/common/AudioRow';


export default {
  components: {
    AudioRow,
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
      });
  },
};
</script>

<style lang="scss" scoped>
  .my-music{
    display: flex;
    flex-direction: column;
  }

</style>
