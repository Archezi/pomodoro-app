<template>
  <div class="container mx-auto h-full ">
    <pomodoro />
  </div>
</template>

<script>
// @ is an alias to /src
import Pomodoro from "../components/Pomodoro.vue";
// import ProgressBar from "../components/ProgressBar.vue";
export default {
  name: "Home",
  components: { Pomodoro },
};
</script>
