<template>
  <div
    class="
          lg:w-5/12 lg:h-24
          w-11/12 h-12
          grid grid-cols-3 gap-1
          items-center 
          border rounded-full px-1 py-1
          "
  >
    <div
      :class="{ 'bg-orange-default': pomodoro }"
      class=" border h-full rounded-full flex items-center justify-center "
    >
      <span>Pomodoro </span>
    </div>
    <div
      :class="[
        shortBreak ? infoPanelClass.activeClass : infoPanelClass.defaultClass,
      ]"
      class=" border h-full transition duration-75 rounded-full flex items-center justify-center "
    >
      <span>Short break</span>
    </div>
    <div
      :class="{ 'bg-orange-default': longBreak }"
      class=" border h-full rounded-full flex items-center justify-center "
    >
      <span>Long brake</span>
    </div>
  </div>
</template>
<script>
export default {
  props: ['pomodoro', 'shortBreak', 'longBreak'],
  data() {
    return {
      infoPanelClass: {
        activeClass: 'bg-orange-default',
        defaultClass: 'bg-transparent',
      },
    };
  },
};
</script>

<style scoped>
.active {
  background: orange;
}
</style>
