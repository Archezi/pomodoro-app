<template>
  <div v-if="show" class="relative">
    <div class="overlay"></div>

    <div class="dialog bg-main-dark   ">
      <div class="dialog__content flex flex-col content-center py-8">
        <div
          class="dialog__title h-1/2 text-font-dark flex self-center justify-self-center text-4xl  "
          v-text="title"
        ></div>
        <div
          class="dialog__description h-1/2 text-font-default text-2xl p-4"
          v-text="description"
        ></div>
      </div>
      <hr />

      <div class="dialog__footer    flex justify-around items-center">
        <button
          @click="close"
          class="dialog__continue w-1/2 border-r h-full transition-colors duration-500 ease-in-out hover:bg-button-accept "
        >
          Continue
        </button>
        <button
          @click="reset"
          class="dialog__reset w-1/2 h-full hover:bg-button-cancel transition-colors duration-500 ease-in-out"
        >
          Reset
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['show', 'title', 'description', 'close', 'reset'],
};
</script>
<style scoped>
.overlay {
  background: black;
  background-size: cover;
  opacity: 0.6;
  height: 100%;
  width: 100%;
}
.dialog {
  position: absolute;
  width: 60%;
  height: 20%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.dialog__content {
  box-sizing: border-box;
  height: 70%;
  width: 100%;
}
.dialog__footer {
  height: 30%;
}

@media only screen and (max-width: 600px) {
  .dialog {
    width: 80%;
    height: 50%;
  }
}
.dialog__continue {
}
</style>
