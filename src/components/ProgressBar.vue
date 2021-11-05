<template>
  <div class="bg-orange box w-full h-full">
    <svg
      :viewBox="`0 0 ${SIZE} ${SIZE}`"
      :height="h || '100%'"
      :width="w || '100%'"
    >
      <g stroke="dodgerblue" stroke-width="5" fill="transparent">
        <circle
          :cx="SIZE / 2"
          :cy="SIZE / 2"
          r="70"
          stroke-linecap="round"
          stroke-dasharray="472"
          stroke-dashoffset="472"
          :style="this.animationObject"
          :class="[
            { animation: pomodoro },
            { pauseAnimation: pause },
            { animationShortBreak: shortBreak },
            { animationLongBreak: longBreak },
          ]"
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
  data() {
    return {
      h: null,
      w: null,
      b: this.animationTime,

      animationObject: {
        animationDuration: "8s",
      },
      animationTime: this.mainTimer,
    };
  },
  methods: {
    aniTime() {
      return (this.animationObject.animationDuration = this.animationTime);
    },
  },
  watch: {
    pause: function() {
      console.log(`pause:, ${this.pause}`);
    },
    mainTimer: function() {
      return;
    },
    pomodoro: function() {
      this.animationObject.animationDuration = this.mainTimer;
      this.aniTime();
    },
    shortBreak: function() {},
    longBreak: function() {},
  },
  mounted() {
    this.aniTime();
  },
};
</script>

<style scoped>
.box svg {
  transform: rotate(90deg);
}
.box svg circle.pomodoroTimer {
  animation-duration: 5s;
}
.box svg circle.shortBreakTimer {
  animation-duration: 15s;
}
.box svg circle.pauseAnimation {
  animation-play-state: paused !important;
}
.box svg circle.animation {
  animation-play-state: running;
  animation: animate 5s linear;
  animation-fill-mode: forwards;
  animation-iteration-count: 1;
}
.box svg circle.animationShortBreak {
  animation-play-state: running;
  animation: animate 15s linear;
  animation-fill-mode: forwards;
  animation-iteration-count: 1;
}
.box svg circle.animationLongBreak {
  animation-play-state: running;
  animation: animate 25s linear;
  animation-fill-mode: forwards;
  animation-iteration-count: 1;
}

@keyframes animate {
  to {
    stroke-dashoffset: 0;
  }
}
</style>
