import { defineStore } from 'pinia'
import type { Weather, Location } from '@/lib/types'

import { lib } from '@/lib/main'

export const useWeatherStore = defineStore('Weather', {
  state: () => {
    return {
      weather: [] as Weather[],
      locations: [] as Location[],
    }
  },
  actions: {
    addWeather(singleWeather: Weather): void {
      const dontCache = this.getWeather.some(el => el.id === singleWeather.id)

      if (dontCache) return

      this.weather.push(singleWeather)
      this.addLocation(singleWeather)
    },

    removeWeather (idx: number): void  {
      this.weather.splice(idx, 1)
      this.removeLocation(idx)
    },

    resetWeather() {
      this.weather = []
      this.locations = []
    },

    setWeather(weatherArr: Weather[]): void {
      this.resetWeather()

      weatherArr.forEach((singleWeather: Weather) => {
        this.addWeather(singleWeather)
      });

    },

    addLocation(singleWeather: Weather | Location): void {
      const { id, name } = singleWeather
      this.locations.push({ id, name })
      
      lib.setLSData('locations', this.locations)  
    },
    
    removeLocation(idx: number) {
      this.locations.splice(idx, 1)

      lib.setLSData('locations', this.locations)  
    },

  },
  getters: {
    getWeather: state => state.weather,
    getLocations: state => state.locations

  }
})