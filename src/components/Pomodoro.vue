<template>
  <div class="wrapper box-border  grid grid-cols-1 h-full justify-center gap-4">
    <section
      class="title 
      h-full w-full
      flex justify-center items-center 
      text-5xl"
    >
      <h1>pomodoro</h1>
    </section>

    <section
      class="info-panel flex justify-center items-center w-full h-full lg: "
    >
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
            shortBreak
              ? infoPanelClass.activeClass
              : infoPanelClass.defaultClass,
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
    </section>
    <section class="timer mx-w-full grid   content-center justify-center    ">
      <div
        class="timer-container relative cursor-pointer  content-center justify-center rounded-full w-72 h-72  "
      >
        <div
          class="hover-element  rounded-full w-full h-full z-99 bg-none"
        ></div>
        <!--start -->
        <div
          @click="start"
          v-if="!timerRunning"
          class="circle-1
          
          transition duration-500 ease-in-out 
          w-full h-full
          z-50
          bg-none
          absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
          border-8  border-font-dark rounded-full"
        >
          <span
            class="absolute bottom-12 left-1/2 transform -translate-x-1/2 tracking-extraWide "
            >START</span
          >
        </div>
        <!--stop -->
        <div
          @click="stop"
          v-else
          class="circle-2 
          w-full h-full
          hover:bg-orange-darker
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
        <!--timer -->
        <div
          class="circle-inner z-50
        absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        >
          <span class="text-6xl font-bold text-font-default z-55"
            >{{ displayMinutes }}:{{ displaySeconds }}</span
          >
        </div>
        <!-- progres bar -->

        <button
          @click="reset"
          v-if="timerRunning"
          class="reset
          border  rounded-full 
          px-2 py-1
          absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-12
          hover:border hover:bg-orange"
        >
          <span>RESET</span>
        </button>
      </div>
    </section>
    <section class="control">
      <progress-bar
        :pomodoro="this.pomodoro"
        :short-break="this.shortBreak"
        :long-break="this.longBreak"
        :main-timer="this.mainTimer"
        :pause="this.pause"
        class="mx-auto progressBar   z-0"
      />
    </section>
  </div>
</template>

<script>
import ProgressBar from "../components/ProgressBar.vue";
export default {
  components: { ProgressBar },
  data() {
    return {
      mainTimer: null,
      timerRunning: false,
      pomodoro: null,
      shortBreak: false,
      longBreak: false,
      timeInterval: null,
      pause: false,
      pomodoroCount: 1,
      pomodoroTimers: {
        pomodoro: 1,
        shortBreak: 2,
        longBreak: 7,
      },
      infoPanelClass: {
        activeClass: "bg-orange-default",
        defaultClass: "bg-transparent",
      },
    };
  },
  provide() {
    return {
      mainTimer: this.mainTimer,
    };
  },
  computed: {
    displayMinutes() {
      const minutes = Math.floor(this.mainTimer / 60);
      return this.formatTime(minutes);
    },
    displaySeconds() {
      const seconds = this.mainTimer % 60;
      return this.formatTime(seconds);
    },
  },
  methods: {
    formatTime(time) {
      if (time < 10) {
        return "0" + time;
      }
      return time.toString();
    },
    stop() {
      this.pause = true;
      this.timerRunning = !this.timerRunning;
      clearInterval(this.timeInterval);
    },
    start() {
      this.pause = false;
      if (this.shortBreak || this.longBreak) {
        this.pomodoro = false;
      } else {
        this.pomodoro = true;
      }
      this.timerRunning = !this.taimerRunning;

      if (this.timerRunning)
        this.timeInterval = setInterval(() => {
          this.mainTimer -= 1;
        }, 1000);
    },
    reset() {
      this.timerRunning = false;
      clearInterval(this.timeInterval);
      this.mainTimer = this.pomodoroTimers.pomodoro;
    },
    // pomodoroCheck() {
    //   !this.shortBreak && !this.longBreak ? this.pomodoro : !this.pomodoro;
    // },
    // shortBreakCheck() {
    //   !this.pomodoro && !this.longBreak ? this.shortBreak : !this.shortBreak;
    // },
    longBreakCheck() {
      if (this.pomodoroCount === 4) {
        this.longBreak = true;
        this.shortBreak = false;
      } else {
        this.longBreak = false;
      }
    },
    updateTimer() {
      if (this.pomodoro) {
        if (this.pomodoroCount === 4) {
          this.mainTimer = this.pomodoroTimers.longBreak;
        } else {
          this.mainTimer = this.pomodoroTimers.shortBreak;
        }
        this.pomodoro = !this.pomodoro;
      } else if (this.shortBreak) {
        this.mainTimer = this.pomodoroTimers.pomodoro;
        this.shortBreak = !this.shortBreak;
      } else if (this.longBreak) {
        this.mainTimer = this.pomodoroTimers.pomodoro;
        this.longBreak = !this.longBreak;
      }
    },
    updatePomodoroCounter() {
      this.pomodoroCount += 1;
      console.log(this.pomodoroCount);
    },

    timerSwitch() {},
  },
  watch: {
    mainTimer: function() {
      let vm = this;

      if (vm.mainTimer === 0 && this.longBreak === true) {
        vm.updateTimer();
        this.pomodoro = !this.pomodoro;
        this.pomodoroCount = 1;
      } else if (vm.mainTimer === 0 && this.shortBreak === true) {
        vm.updateTimer();
        vm.updatePomodoroCounter();
        this.pomodoro = !this.pomodoro;
      } else if (vm.mainTimer === 0 && this.pomodoro === true) {
        if (this.pomodoroCount === 4) {
          vm.updateTimer();
          this.longBreak = !this.longBreak;
        } else {
          vm.updateTimer();
          this.shortBreak = true;
        }
      }

      // if (
      //   vm.mainTimer === 0 &&
      //   vm.pomodoro &&
      //   !vm.shortBreak &&
      //   !vm.longBreak
      // ) {
      //   // set new timer for short break
      //   vm.mainTimer = vm.pomodoroTimers.shortBreak;
      //   vm.shortBreak = !vm.shortBreak;
      //   vm.pomodoro = !vm.pomodoro;
      //   vm.updatePomodoroCounter();
      // } else if (
      //   vm.mainTimer === 0 &&
      //   vm.shortBreak &&
      //   !vm.pomodoro &&
      //   !vm.longBreak
      // ) {
      //   vm.mainTimer = vm.pomodoroTimers.pomodoro;
      //   vm.shortBreak = !vm.shortBreak;
      //   vm.pomodoro = !vm.pomodoro;
      // } else if (
      //   vm.mainTimer === 0 &&
      //   vm.pomodoro &&
      //   !vm.shortBreak &&
      //   vm.longBreakCheck()
      // ) {
      //   vm.mainTimer = vm.pomodoroTimers.longBreak;
      //   vm.pomodoro = true;
      //   vm.shortBreak = false;
      //   vm.shortBreak = false;
      // }
    },
  },
  mounted() {
    this.mainTimer = this.pomodoroTimers.pomodoro;
    console.log(`Pomodoro App is Running`);
  },
};
</script>

<style scoped>
.wrapper {
  grid-template-rows: 10% 10% 70% 10%;
}

.active {
  background: orange;
}

.timer-container:hover .circle-1 {
  background-color: #c45957;
}
</style>
