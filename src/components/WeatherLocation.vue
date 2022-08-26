<script lang="ts" setup>
import type { Weather } from '@/lib/types'
import { ref } from 'vue'

import { lib } from '@/lib/main'

const props = defineProps<{
  weather: Weather
}>() 

const weather = ref(props.weather) 

const rnd = (num: number) => {
  return Math.round(num)
}

const degToDirection = (degree: number) => {
  const val = Math.floor((degree / 22.5) + 0.5);
  const arr = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  return arr[(val % 16)];
}

const timeToDate = (time: number) => {
  return `${new Date(time).getUTCHours()}:${new Date(time).getUTCMinutes()}`
}
</script>

<template>
  <div class="weather">
    <div class="top-part">
      <h4 class="font-bold text-lg">{{ weather.name }}, {{ weather.sys?.country }}</h4>
      <div class="img">
        <img :src="`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`" :alt="`${weather.weather[0].description} icon`">
        <span class="font-bold text-5xl">{{ rnd(weather.main?.temp) }}&deg;C</span>
      </div>
    </div>

    <div class="bottom-part">
      <p class="text-lg  pb-4">Feels like {{ rnd(weather.main.feels_like) }}&deg;C.
       {{ lib.capitalizeFirstLetter(weather.weather[0].description) }}. 
      </p>

      <div class="flex gap-8">
        <div class="left">
          <div class="icon-line">
            <v-icon name="fa-wind"
              scale="1.1"/>
            <p class="font-medium">{{ weather.wind?.speed }}m/s {{ degToDirection(weather.wind?.deg) }}</p>
          </div>

          <p class="font-medium">Humidity: {{ weather.main.humidity }}%</p>

          <p class="font-medium">Visibility: {{ weather.visibility/1000 }}.0 km</p>
        </div>

        <div class="right">
          <div class="icon-line">
            <v-icon name="wi-barometer"
              scale="1.1"/>
            <p class="font-medium">{{ weather.main.pressure }} hPa</p>
          </div>

          <p class="font-medium">Sunrise: {{ timeToDate(weather.sys.sunrise) }}</p>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
.weather {
  @apply p-4 flex flex-col gap-2
}

.top-part {
  @apply flex justify-between
}

.bottom-part {
  @apply flex flex-col gap-2 text-lg
}

.img {
  @apply flex items-center gap-2
}

.icon-line {
  @apply flex gap-2 items-center
}


</style>