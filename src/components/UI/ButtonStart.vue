<template>
  <div
    @click="startTimer"
    class="start-button
          transition duration-500 ease-in-out 
          hover:bg-main-darker
          z-50
          bg-none
          absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
          rounded-full"
  >
    <span
      class="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-xl font-bold text-font-default tracking-extraWide "
      >START</span
    >
  </div>
</template>
<script>
export default {
  props: ['timerRunning'],
  methods: {
    startTimer() {
      this.$emit('start-timer')
    }
  }
}
</script>
<style scoped></style>
