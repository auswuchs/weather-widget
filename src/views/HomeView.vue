<script setup lang="ts">
import { computed } from 'vue'

import WeatherLocation from '@/components/WeatherLocation.vue'

import { useWeatherStore } from '@/stores/weather'
const store = useWeatherStore()


const weather = computed(() => store.getWeather)

</script>

<template>
  <main class="container mx-auto min-h-screen">
    <div v-if="weather.length > 0" class="main-grid">
      <div v-for="(item) in weather" :key="item.id" class="bg-slate-200">
        <Weather-Location :weather="item" />
      </div>
    </div>

    <h2 v-else>You haven't added any locations</h2>
  </main>
</template>

<style scoped>
.main-grid {

  @apply sm:grid-cols-3 grid-cols-1 grid w-full gap-4 pt-2
}

</style>

