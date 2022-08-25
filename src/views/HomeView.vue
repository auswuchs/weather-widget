<script setup lang="ts">
import { api } from '@/lib/api'
import { lib } from '@/lib/main'

import type { Weather, Location } from '@/lib/types'

import { useRouter } from 'vue-router'
import { onMounted, computed } from 'vue'
import { useWeatherStore } from '@/stores/weather'
const store = useWeatherStore()
const router = useRouter()



const weather = computed(() => store.getWeather)

const getAutoWeather = async () => {
  const userLocation = await api.getUserLocation()
  const { city, country } = userLocation;
  const initialWeather = await api.getWeather(city, country)

  store.addWeather(initialWeather)
}

const getCachedLocations = async () => {
  const locations = lib.getLSData<Location[]>('locations') || []

  if (locations?.length > 0) {
    const weather = await lib.getWeatherInfo(locations)
    weather.forEach((item: Weather): void => store.addWeather(item));
  } else {
    getAutoWeather()
  }
}

onMounted(() => {
  getCachedLocations()
})


</script>

<template>
  <div class="container mx-auto">
    <v-icon class="main-icon" 
            name="la-cog-solid"
            scale="2"
            animation="spin"
            speed="slow"
            title="Settings"
            :hover="true"
            @click="router.push({ name:'settings'})"
            ></v-icon>

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

