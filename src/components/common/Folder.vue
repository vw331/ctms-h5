<script setup>
import { defineProps } from "vue";
const props = defineProps({
  isEmpty: {
    type: Boolean,
    default: true,
  },
  size: {
    type: String,
    default: "32px",
  },
});
</script>


<template>
  <svg
    v-if="props.isEmpty"
    t="1632451530713"
    viewBox="0 0 1024 1024"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    p-id="949"
    class="icon"
    :style="{
      height: props.size,
      width: props.size,
    }"
  >
    <path
      d="M0 139.636364a46.545455 46.545455 0 0 1 46.545455-46.545455h354.897454a51.2 51.2 0 0 1 47.057455 31.034182L473.6 182.679273 977.454545 182.690909a46.545455 46.545455 0 0 1 46.545455 46.545455v546.909091a46.545455 46.545455 0 0 1-46.545455 46.545454H46.545455a46.545455 46.545455 0 0 1-46.545455-46.545454V139.636364z"
      fill="#FFA000"
      p-id="950"
    ></path>
    <path
      d="M0 276.945455m46.545455 0l930.90909 0q46.545455 0 46.545455 46.545454l0 558.545455q0 46.545455-46.545455 46.545454l-930.90909 0q-46.545455 0-46.545455-46.545454l0-558.545455q0-46.545455 46.545455-46.545454Z"
      fill="#FFCA28"
      p-id="951"
    ></path>
  </svg>
  <svg
    v-else
    t="1632451731129"
    viewBox="0 0 1024 1024"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    p-id="1222"
    class="icon"
    :style="{
      height: props.size,
      width: props.size,
    }"
  >
    <path
      d="M0 128a51.2 51.2 0 0 1 51.2-51.2h350.24a51.2 51.2 0 0 1 47.0592 31.0336L473.6 166.4h499.2a51.2 51.2 0 0 1 51.2 51.2v537.6a51.2 51.2 0 0 1-51.2 51.2H51.2a51.2 51.2 0 0 1-51.2-51.2V128z"
      fill="#FFA000"
      p-id="1223"
    ></path>
    <path
      d="M89.6 249.6m51.2 0l742.4 0q51.2 0 51.2 51.2l0 460.8q0 51.2-51.2 51.2l-742.4 0q-51.2 0-51.2-51.2l0-460.8q0-51.2 51.2-51.2Z"
      fill="#FFFFFF"
      p-id="1224"
    ></path>
    <path
      d="M0 332.8m51.2 0l921.6 0q51.2 0 51.2 51.2l0 512q0 51.2-51.2 51.2l-921.6 0q-51.2 0-51.2-51.2l0-512q0-51.2 51.2-51.2Z"
      fill="#FFCA28"
      p-id="1225"
    ></path>
  </svg>
</template>

<style>
</style>