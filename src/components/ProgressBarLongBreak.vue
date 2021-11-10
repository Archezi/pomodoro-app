<template>
  <div class="bg-orange box w-full h-full">
    <svg :viewBox="`0 0 150 150`" :height="h || '100%'" :width="w || '100%'">
      <g stroke="dodgerblue" stroke-width="5" fill="transparent">
        <circle
          :cx="75"
          :cy="75"
          r="70"
          stroke-linecap="round"
          stroke-dasharray="472"
          stroke-dashoffset="472"
          :class="[{ animation: longBreak }, { pauseAnimation: pause }]"
        />
        <path />
      </g>
    </svg>
  </div>
</template>

<script>
export default {
  beforeCreate() {
    this.SIZE = 200;
  },
  props: ["pomodoro", "shortBreak", "longBreak", "mainTimer", "pause"],
  computed: {
    animationTime() {
      return parseInt(this.mainTimer + 2);
    },
  },
};
</script>

<style scoped>
.box svg {
  transform: rotate(-90deg);
}
.box svg circle.pauseAnimation {
  animation-play-state: paused !important;
}

.box svg circle.animation {
  animation-play-state: running;
  animation-name: animate;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
  animation-iteration-count: 1;
  animation-duration: 15s;
}
@keyframes animate {
  to {
    stroke-dashoffset: 0;
  }
}
</style>
