<template>
  <button class="btn bg-prime text-white ps-3 pe-4 rounded-3 ls fw-medium d-block" :class="`${position}`">
    <component v-if="icon" :is="icon" size="18" class="me-1" />
    {{ btnName }}
  </button>
</template>

<script setup>
defineProps({
  btnName: {
    type: String,
    default: "Btn Name",
  },
  icon: {
    type: [Object, Function, String],
    default: null,
  },
  position: {
    type: String,
    default: "me-auto"
  }
});
</script>
