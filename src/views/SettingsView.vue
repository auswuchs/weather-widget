<script setup lang="ts">
import { useWeatherStore } from '@/stores/weather'
import { computed } from 'vue';

import TheHeader from '@/components/TheHeader.vue'
import SettingsTable from '@/components/SettingsTable.vue'


const store = useWeatherStore()

const weather = computed(() => store.getWeather)

const onRemoveLocation = (idx: number) => {
  store.removeWeather(idx)
}
</script>



<template>
  <div class="container mx-auto">
    <The-Header />

    <Settings-Table :weather="weather"
                    @removeLocation="onRemoveLocation"/>

  </div>
</template>