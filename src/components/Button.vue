<template>
  <button
    class="btn bg-prime text-white px-4 rounded-3 ls fw-medium d-block"
    :class="`${position}`"
  >
    {{ btnName }}
  </button>
</template>

<script setup>
defineProps({
  btnName: {
    type: String,
    default: "Btn Name",
  },
  position: {
    type: String,
    default: "me-auto",
  },
});
</script>
