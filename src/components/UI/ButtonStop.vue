<template>
  <div
    @click="stopTimer"
    class="stop-button
          w-full h-full
          hover:bg-button-cancelDarker
          transition duration-500 ease-in-out 
          z-50
          absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
          border-8  border-font-dark rounded-full"
  >
    <span
      class="absolute bottom-12 left-1/2 transform -translate-x-1/2 tracking-extraWide "
      >STOP</span
    >
  </div>
</template>
<script>
export default {
  props: ["timerRunning"],
  methods: {
    stopTimer() {
      this.$emit("stop-timer");
    },
  },
};
</script>
