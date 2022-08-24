<script setup lang="ts">
import { api } from '@/lib/api'
import { onMounted, computed } from 'vue'

import { useWeatherStore } from '@/stores/weather'
const store = useWeatherStore()

const getInitialWeather = async () => {
  const userLocation = await api.getUserLocation()
  const { city, country } = userLocation;
  const initialWeather = await api.getWeather(city, country)

  store.addWeather(initialWeather)
}

const weather = computed(() =>  store.getWeather)

onMounted(() => {
  getInitialWeather()
})



</script>

<template>
  <pre v-if="weather.length > 0">{{ weather }}</pre>
</template>

