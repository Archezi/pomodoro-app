<template>
  <div class="bg-orange box w-full h-full">
    <svg :viewBox="`0 0 150 150`" :height="'100%'" :width="'100%'">
      <g stroke="dodgerblue" stroke-width="5" fill="transparent">
        <circle
          :cx="75"
          :cy="75"
          r="70"
          stroke-linecap="round"
          stroke-dasharray="472"
          stroke-dashoffset="472"
          :style="{ animationDuration: animationDuration }"
          :class="[{ animation: shortBreak }, { pauseAnimation: pause }]"
        />
        <path />
      </g>
    </svg>
  </div>
</template>

<script>
export default {
  props: ["shortBreak", "pause", "mainTimer"],
  data() {
    return {
      animationDuration: null,
    };
  },
  methods: {
    setAnimationTime() {
      this.animationDuration = `${this.mainTimer}s`;
    },
  },
  created() {
    this.setAnimationTime();
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
  animation-delay: 0.5s;
}
@keyframes animate {
  to {
    stroke-dashoffset: 0;
  }
}
</style>
