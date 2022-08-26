<script setup lang="ts">
import { computed } from 'vue'

import { useWeatherStore } from '@/stores/weather'
const store = useWeatherStore()


const weather = computed(() => store.getWeather)

</script>

<template>
  <div class="container mx-auto">

    <div v-for="(item, idx) in weather" :key="item.id">
      <div class="flex justify-between max-w-lg">
        <p class="font-bold">{{ idx }}. {{ item.name }}, {{ item.sys?.country }}</p>
        <span @click="store.removeWeather(idx)">X</span>
      </div>
    </div>

    <pre v-if="weather.length > 0">{{ weather }}</pre>
  </div>
</template>

<style scoped>

</style>

