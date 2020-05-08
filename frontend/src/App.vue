<template>
  <div id="app">
    <header-page />
    <player-audio />
    <user-content />
  </div>
</template>

<script>
import HeaderPage from '@/components/HeaderPage';
import UserContent from '@/components/user-content/UserContent';
import PlayerAudio from '@/components/PlayerAudio';

export default {
  components: {
    UserContent,
    HeaderPage,
    PlayerAudio,
  },
};

</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 70vw;
  display: flex;
  flex-direction: column;
  align-items: center;
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
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  border-radius: 3px;
}

</style>
