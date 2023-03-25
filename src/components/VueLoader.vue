<script lang="ts" setup>

</script>

<template>
  <div class="v-loader" id="vloader">
    <div class="v-spinner"></div>
  </div>
</template>

<style scoped>
.v-loader {
  z-index: 5000;

  @apply fixed w-screen h-screen backdrop-blur-md bg-slate-900 opacity-70 left-0 top-0
}

.v-spinner {
  animation: spin 2s linear infinite;
  border: 16px solid #f3f3f3; 
  border-top: 16px solid #3498db;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  top: 50%;
  left: 50%;

  transform: translate(-50%,-50%);

  @apply absolute 
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

</style>