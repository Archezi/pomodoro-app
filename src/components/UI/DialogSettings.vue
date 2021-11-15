<template>
  <div class="setting__wrapper relative divide-y bg-main-dark h-full w-full">
    <header class="header  ">
      <div class="settings__heading flex align-center  justify-between p-4">
        <h2 class="text-xl">Settings</h2>
        <span>Close</span>
      </div>
    </header>
    <section class="settings  ">
      <div class="setting__title flex justify-start p-4 text-xl">
        <h2>Pomodoro timers settings</h2>
      </div>
      <div class="settings__timers grid grid-cols-3 gap-4 p-4 ">
        <div class="pomodoro-timer flex flex-col">
          <div class="h-8">
            <label for="longbreak">pomodoro</label>
            <div
              class="grid grid-cols-3 h-8  w-full rounded-lg relative bg-transparent mt-1"
            >
              <button
                @click="decreasePomodoro"
                class=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full  rounded-l cursor-pointer outline-none"
              >
                <span class="m-auto text-2xl font-thin">−</span>
              </button>
              <input
                class="outline-none focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700"
                type="number"
                id="longbreak"
                name="longbreak"
                min="1"
                max="60"
                :value="`${pomodoro}`"
              />

              <button
                @click="increasePomodoro"
                data-action="increment"
                class="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full rounded-r cursor-pointer"
              >
                <span class="m-auto text-2xl font-thin">+</span>
              </button>
            </div>
          </div>
        </div>
        <div class="shortbreak-timer flex flex-col">
          <div class="h-8">
            <label for="longbreak">short break</label>
            <div
              class="grid grid-cols-3 h-8  w-full rounded-lg relative bg-transparent mt-1"
            >
              <button
                @click="decreaseShortBreak"
                class=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full  rounded-l cursor-pointer outline-none"
              >
                <span class="m-auto text-2xl font-thin">−</span>
              </button>
              <input
                class="outline-none focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700"
                type="number"
                id="longbreak"
                name="longbreak"
                min="1"
                max="60"
                :value="`${shortBreak}`"
              />

              <button
                @click="increaseShortBreak"
                data-action="increment"
                class="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full rounded-r cursor-pointer"
              >
                <span class="m-auto text-2xl font-thin">+</span>
              </button>
            </div>
          </div>
        </div>
        <div class="longbreak-timer flex flex-col">
          <div class="h-8">
            <label for="longbreak">long break</label>
            <div
              class="grid grid-cols-3 h-8  w-full rounded-lg relative bg-transparent mt-1"
            >
              <button
                @click="decreaseLongBreak"
                class=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full  rounded-l cursor-pointer outline-none"
              >
                <span class="m-auto text-2xl font-thin">−</span>
              </button>
              <input
                class="outline-none focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700"
                type="number"
                id="longbreak"
                name="longbreak"
                min="1"
                max="60"
                :value="`${longBreak}`"
              />

              <button
                @click="increaseLongBreak"
                data-action="increment"
                class="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full rounded-r cursor-pointer"
              >
                <span class="m-auto text-2xl font-thin">+</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <footer class="footer absolute bottom-0 left-0 w-full p-4 ">
      <button @click="timerSettings" class="border rounded px-8 py-2">
        Apply
      </button>
    </footer>
  </div>
</template>
<script>
export default {
  props: ["pomodoro", "shortBreak", "longBreak"],

  data() {
    return {
      customPomodoroTime: 25,
      customShortBreakTime: 5,
      customLongBreakTime: 30,
    };
  },
  methods: {
    increasePomodoro: function() {
      this.customPomodoroTime++;
    },
    decreasePomodoro: function() {
      this.customPomodoroTime--;
    },
    increaseShortBreak: function() {
      this.customShortBreakTime++;
    },
    decreaseShortBreak: function() {
      this.customShortBreakTime--;
    },
    increaseLongBreak: function() {
      this.customLongBreakTime++;
    },
    decreaseLongBreak: function() {
      this.customLongBreakTime--;
    },
  },
  computed: {
    timerSettings() {
      return console.log(this.customPomodoroTime);
    },
  },
};
</script>
<style scoped>
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.header {
  /* height: 15%; */
}
.settings {
  /* height: 70%; */
}
.footer {
  /* height: 15%; */
}
</style>
