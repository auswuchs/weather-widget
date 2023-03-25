<script setup lang="ts">
import { api } from '@/lib/api'
import { lib } from '@/lib/main'

import VueHeader from '@/components/VueHeader.vue'
import VueLoader from '@/components/VueLoader.vue'
import { onBeforeMount, ref, watch, computed } from 'vue'

import type { Weather, Location } from '@/lib/types'

import { useWeatherStore } from '@/stores/weather'
const store = useWeatherStore()


const city = ref('')
const location = ref<Weather | null>(null)
const canSearch = ref(true)
const loading = ref(false)


const showLoader = () => {
  loading.value = true
}

const hideLoader = () => {
  loading.value = false
}

const getUserWeather = async () => {
  try {
    const userLocation = await api.getUserLocation()
    const { city, country } = userLocation;
    const initialWeather = await api.getWeather(city, country)

    store.addWeather(initialWeather)
  } catch (e) {
    console.error(e)
    
  } 
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


const getLocation = async () => {
  if (canSearch.value && city.value) {
    showLoader()
    canSearch.value = false

    try {
      location.value = await api.getWeather(city.value)
    } catch (e) {
      console.error(e)
    } finally {
      hideLoader()
      canSearch.value = true
    }
  }
}

const addLocation = () => {
  if(!isAddAllowed.value) return
  store.addWeather(location.value as Weather)

  city.value = ''
  location.value = null
}

watch(city, () => {
  debouncedSearch()
})

const debouncedSearch =  lib.debounce(getLocation, 500)

const isAddAllowed = computed(() => {
  return !!city.value
    && location.value?.cod === 200
    && !store.getWeather.some(el => el.id === location.value?.id) 
})


onBeforeMount(() => {
  getCachedLocations();
})

</script>

<script lang="ts">
export default {
  name: 'WeatherWidget',
}
</script>

<template>
    <VueHeader 
        v-model:city="city" 
        :isAddAllowed="isAddAllowed" 
        @addLocation="addLocation"/>

    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>

    <VueLoader v-if="loading" />
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
