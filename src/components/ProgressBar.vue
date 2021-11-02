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
  props: ["pomodoro", "shortBreak", "longBreak", "mainTimer"],
  inject: [""],
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
    pomodoro: function() {
      console.log("pomodoro changed");
    },
    shortBreak: function() {
      console.log("shortBreak changed");
    },
    longBreak: function() {
      console.log("longBreak changed");
    },
  },
  mounted() {
    this.aniTime();
    console.log(this.pomodoro, this.shortBreak, this.longBreak, this.mainTimer);
    // console.log(this.animationObject.animationDuration);
  },
};
</script>

<style scoped>
.box svg {
  transform: rotate(90deg);
}
.box svg circle {
  animation: animate linear;
  animation-fill-mode: forwards;
  animation-iteration-count: 1;
}
@keyframes animate {
  to {
    stroke-dashoffset: 0;
  }
}
</style>
