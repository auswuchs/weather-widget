import { defineStore } from 'pinia'
import type { Weather } from '@/lib/types'

export const useWeatherStore = defineStore('Weather', {
  state: () => {
    return { weather: [] as Weather[] }
  },
  actions: {
    addWeather (singleWeather: Weather): void {
      this.weather.push(singleWeather)
    },

    removeWeather (idx: number): void  {
      this.weather.splice(idx, 1)
    }
  },
  getters: {
    getWeather: state => state.weather
  }
})