<script setup lang="ts">
import { useWeatherStore } from '@/stores/weather'
import { computed } from 'vue';
import type { Weather } from '@/lib/types'

import { lib } from '@/lib/main'

import SettingsTable from '@/components/SettingsTable.vue'


const store = useWeatherStore()

const weather = computed(() => store.getWeather)

const onRemoveLocation = (idx: number) => {
  store.removeWeather(idx)
}

const onDrop = ({ oldIdx, toIdx }: { oldIdx: number, toIdx: number }) => {
  const newWeatherArr = lib.moveItemInArray<Weather>(store.getWeather, oldIdx, toIdx) 

  store.setWeather(newWeatherArr)
}
</script>



<template>
  <div class="container mx-auto">
    <Settings-Table :weather="weather"
                    @removeLocation="onRemoveLocation"
                    @onDrop="onDrop"/>

  </div>
</template>