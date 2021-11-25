<template>
  <button
    @click="resetTimers"
    v-if="!timerRunning"
    class="reset
          border  rounded-full 
          px-2 py-1
          absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-12
          hover:border hover:bg-orange"
  >
    <span>RESET</span>
  </button>
</template>
<script>
export default {
  props: ['timerRunning'],
  methods: {
    resetTimers() {
      this.$emit('reset-timers');
    },
  },
};
</script>
