<script setup lang="ts">
import TheHeader from '@/components/TheHeader.vue'
import { onBeforeMount } from 'vue'

import type { Weather, Location } from '@/lib/types'

import { useWeatherStore } from '@/stores/weather'
const store = useWeatherStore()

import { api } from '@/lib/api'
import { lib } from '@/lib/main'



const getUserWeather = async () => {
  const userLocation = await api.getUserLocation()
  const { city, country } = userLocation;
  const initialWeather = await api.getWeather(city, country)
  const secondWeather = await api.getWeather('New York', 'us')

  store.addWeather(initialWeather)
  store.addWeather(secondWeather)
}

const getCachedLocations = async () => {
  const locations = lib.getLSData<Location[]>('locations') || []

  if (locations?.length > 0) {
    const weather = await lib.getWeatherInfo(locations)
    weather.forEach((item: Weather): void => store.addWeather(item));
  } else {
    getUserWeather()
  }
}

onBeforeMount(() => {
  getCachedLocations()
})



</script>

<script lang="ts">
export default {
  name: 'WeatherWidget',
  data() {
    return {
    }
  }
}
</script>

<template>
    <The-Header />

    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
