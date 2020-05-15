<template>
  <transition name="modal">
    <div
      class="modal"
    >
      <slot />
      <div
        class="overlay"
        @click.stop="closeModal"
      />
    </div>
  </transition>
</template>

<script>
export default {
  methods: {
    closeModal() {
      this.$emit('close');
    },
  },
};
</script>

<style scoped lang="scss">

  .overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(black, 0.75);
    z-index: -1;
  }

  .modal {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    z-index: 100;
    transition: opacity 0.2s ease;
  }
</style>
