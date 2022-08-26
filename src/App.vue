<script setup lang="ts">
import TheHeader from '@/components/TheHeader.vue'
import VLoader from '@/components/VLoader.vue'
import { onBeforeMount, ref, watch, computed } from 'vue'

import type { Weather, Location } from '@/lib/types'

import { useWeatherStore } from '@/stores/weather'
const store = useWeatherStore()

import { api } from '@/lib/api'
import { lib } from '@/lib/main'

const city = ref('')
const location = ref<Weather | null>(null)
const canSearch = ref(true)

const getUserWeather = async () => {
  lib.showLoader()

  try {
    const userLocation = await api.getUserLocation()
    const { city, country } = userLocation;
    const initialWeather = await api.getWeather(city, country)
    const secondWeather = await api.getWeather('New York', 'us')

    store.addWeather(initialWeather)
    store.addWeather(secondWeather)
    
  } catch (e) {
    console.error(e)
    
  } finally {
    lib.hideLoader()
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
    lib.showLoader()
    canSearch.value = false

    try {
      location.value = await api.getWeather(city.value)
    } catch (e) {
      console.error(e)
    } finally {
      lib.hideLoader()
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
  data() {
    return {
    }
  }
}
</script>

<template>
    <The-Header 
        v-model:city="city" 
        :isAddAllowed="isAddAllowed" 
        @addLocation="addLocation"/>

    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>

    <V-Loader />
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
