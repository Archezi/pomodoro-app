<template>
  <div
    class="wrapper box-border relative grid grid-cols-1 h-full justify-center gap-4"
  >
    <section
      class="title 
      h-full w-full
      flex justify-center items-center 
      text-5xl"
    >
      <h1>pomodoro</h1>
    </section>

    <section
      class="info-panel
      w-full h-full
      flex justify-center items-center"
    >
      <display-panel
        :pomodoro="pomodoro"
        :short-break="shortBreak"
        :long-break="longBreak"
      ></display-panel>
    </section>
    <section
      class="timer
             mx-w-full 
             grid content-center justify-center"
    >
      <div
        class="timer-container 
        relative content-center justify-center 
        cursor-pointer rounded-full"
      >
        <div
          class="hover-element 
          w-full h-full 
          rounded-full
          z-90 bg-none"
        ></div>
        <!--start -->
        <button-start
          v-if="!timerRunning"
          @start-timer="start"
          :timer-running="timerRunning"
        />
        <!--stop -->
        <button-stop v-else @stop-timer="stop" :timer-running="timerRunning" />
        <!--timer -->
        <div
          class="timer-display 
          absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
          z-50"
        >
          <span class="text-6xl font-bold text-font-default z-55"
            >{{ displayMinutes }}:{{ displaySeconds }}</span
          >
        </div>
        <!-- progres bar -->
        <div class="progress-bar-wrapper">
          <progress-bar-pomodoro
            v-if="pomodoro"
            :pomodoro="pomodoro"
            :pause="pause"
            :main-timer="mainTimer"
          />
          <progress-bar-short-break
            v-if="shortBreak"
            :short-break="shortBreak"
            :pause="pause"
            :main-timer="mainTimer"
          />
          <progress-bar-long-break
            v-if="longBreak"
            :long-break="longBreak"
            :pause="pause"
            :main-timer="mainTimer"
          />
        </div>
        <button-reset @reset-timers="resetButton" />
      </div>
    </section>
    <section class="control flex justify-center items-center ">
      <div
        @click="dialogSettings"
        class="w-16 h-10 flex justify-center cursor-pointer "
      >
        <img src="../assets/UI/settings.svg" alt="" />
      </div>
    </section>
  </div>
  <dialog-settings
    v-if="dialog.settings"
    :pomodoro="pomodoroTimers.pomodoro"
    :short-break="pomodoroTimers.shortBreak"
    :long-break="pomodoroTimers.longBreak"
    @custom-timers="setCustomTimers"
    @close-settings="dialogSettings"
    class="dialog__settings"
  />
  <dialog-confirmation
    v-if="dialog.dialogShow"
    :show="dialog.dialogShow"
    :title="dialog.dialogTitle"
    :description="dialog.dialogDescription"
    :close="dialogClose"
    :reset="resetTimers"
    class="dialog__confiramtion"
  />
</template>

<script>
import DialogSettings from './UI/DialogSettings.vue'
import DialogConfirmation from './UI/DialogConfirmation.vue'
import ProgressBarPomodoro from './ProgressBarPomodoro.vue'
import ProgressBarShortBreak from './ProgressBarShortBreak.vue'
import ProgressBarLongBreak from './ProgressBarLongBreak.vue'
import DisplayPanel from './UI/DisplayPanel.vue'
import ButtonStop from './UI/ButtonStop.vue'
import ButtonStart from './UI/ButtonStart.vue'
import ButtonReset from './UI/ButtonReset.vue'
export default {
  components: {
    ProgressBarPomodoro,
    ProgressBarShortBreak,
    ProgressBarLongBreak,
    DisplayPanel,
    ButtonStop,
    ButtonStart,
    ButtonReset,
    DialogConfirmation,
    DialogSettings
  },
  data() {
    return {
      mainTimer: null,
      timerRunning: false,
      timeInterval: null,
      pomodoro: null,
      shortBreak: false,
      longBreak: false,
      pause: false,
      pomodoroCount: 1,
      dialog: {
        dialogShow: false,
        settings: false,
        dialogTitle: 'Pomodoro',
        dialogDescription: 'Are you sure you want to reset Pomodoro timers? '
      },
      pomodoroTimers: {
        pomodoro: null,
        shortBreak: null,
        longBreak: null
      }
    }
  },

  computed: {
    displayMinutes() {
      const minutes = Math.floor(this.mainTimer / 60)
      return this.formatTime(minutes)
    },
    displaySeconds() {
      const seconds = this.mainTimer % 60
      return this.formatTime(seconds)
    }
  },
  methods: {
    formatTime(time) {
      if (time < 10) {
        return '0' + time
      }
      return time.toString()
    },
    stop() {
      this.pause = true
      this.timerRunning = !this.timerRunning
      clearInterval(this.timeInterval)
    },
    start() {
      this.pause = false
      if (this.shortBreak || this.longBreak) {
        this.pomodoro = false
      } else {
        this.pomodoro = true
      }
      this.timerRunning = !this.taimerRunning

      if (this.timerRunning)
        this.timeInterval = setInterval(() => {
          this.mainTimer -= 1
        }, 1000)
    },
    resetButton() {
      this.dialog.dialogShow = true
      this.timerRunning = false
      this.pause = true
    },
    dialogClose() {
      console.log('close')
      this.timerRunning = true
      this.pause = false
      this.dialog.dialogShow = false
    },
    resetTimers() {
      this.timerRunning = false
      clearInterval(this.timeInterval)
      this.pomodoro = false
      this.shortBreak = false
      this.longBreak = false
      this.defaultTimers()
      this.mainTimer = this.pomodoroTimers.pomodoro
      this.dialog.dialogShow = false
    },
    dialogSettings() {
      this.dialog.settings = !this.dialog.settings
    },
    longBreakCheck() {
      if (this.pomodoroCount === 4) {
        this.longBreak = true
        this.shortBreak = false
      } else {
        this.longBreak = false
      }
    },
    defaultTimers() {
      const min = 60
      this.pomodoroTimers.pomodoro = 25 * min
      this.pomodoroTimers.shortBreak = 5 * min
      this.pomodoroTimers.longBreak = 30 * min
    },
    updateTimer() {
      if (this.pomodoro) {
        if (this.pomodoroCount === 4) {
          this.mainTimer = this.pomodoroTimers.longBreak
        } else {
          this.mainTimer = this.pomodoroTimers.shortBreak
        }
        this.pomodoro = !this.pomodoro
      } else if (this.shortBreak) {
        this.mainTimer = this.pomodoroTimers.pomodoro
        this.shortBreak = !this.shortBreak
      } else if (this.longBreak) {
        this.mainTimer = this.pomodoroTimers.pomodoro
        this.longBreak = !this.longBreak
      }
    },
    updatePomodoroCounter() {
      this.pomodoroCount += 1
      console.log(this.pomodoroCount)
    },
    setCustomTimers(customPomodoro, customShortBreak, customLongBreak) {
      this.pomodoroTimers.shortBreak = customShortBreak * 60
      this.pomodoroTimers.longBreak = customLongBreak * 60
      this.pomodoroTimers.pomodoro = customPomodoro * 60
      this.mainTimer = customPomodoro * 60
      this.dialogSettings()
    }
  },
  watch: {
    mainTimer: function() {
      if (this.mainTimer === 0 && this.longBreak === true) {
        this.updateTimer()
        this.pomodoro = !this.pomodoro
        this.pomodoroCount = 1
      } else if (this.mainTimer === 0 && this.shortBreak === true) {
        this.updateTimer()
        this.updatePomodoroCounter()
        this.pomodoro = !this.pomodoro
      } else if (this.mainTimer === 0 && this.pomodoro === true) {
        if (this.pomodoroCount === 4) {
          this.updateTimer()
          this.longBreak = !this.longBreak
        } else {
          this.updateTimer()
          this.shortBreak = true
        }
      }
    }
  },
  created() {
    this.defaultTimers()
    this.mainTimer = this.pomodoroTimers.pomodoro
  },
  mounted() {
    console.log(`Pomodoro App is Running`)
  }
}
</script>

<style scoped>
.wrapper {
  grid-template-rows: 10% 10% 60% 10%;
}

.timer-container {
  height: 400px;
  width: 400px;
  padding: 20px;
  -webkit-box-shadow: 11px 17px 19px 5px rgba(0, 0, 0, 0.2),
    -5px -5px 19px 5px rgba(255, 255, 255, 0.2);
  box-shadow: 11px 17px 19px 5px rgba(0, 0, 0, 0.2),
    -5px -5px 19px 5px rgba(255, 255, 255, 0.2);
  @media (max-width: 350px) {
    height: 300px;
    width: 300px;
  }
}
.hover-element {
  /* -webkit-box-shadow: 0px 0px 24px 5px rgba(218, 214, 214, 0.5);
  box-shadow: 0px 0px 24px 5px rgba(200, 200, 200, 0.5); */
}
.progress-bar-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 100%;
  width: 100%;
}
.start-button,
.stop-button {
  height: 85%;
  width: 85%;
  background-color: #151932;
}

.dialog__confiramtion {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
}
.dialog__settings {
  position: absolute;
  width: 90%;
  height: 50%;
  max-width: 40rem;
  max-height: 20rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
}
</style>
