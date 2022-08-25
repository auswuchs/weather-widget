import { defineStore } from 'pinia'
import type { Weather, Location } from '@/lib/types'

import { lib } from '@/lib/main'

export const useWeatherStore = defineStore('Weather', {
  state: () => {
    return {
      weather: [] as Weather[],
      locations: [] as Location[]
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

    addLocation(singleWeather: Weather | Location): void {
      const { id, name } = singleWeather
      const locations = [...this.locations]
      locations.push({ id, name })
      
      lib.setLSData('locations', locations)  
    },
    
    removeLocation(idx: number) {
      const locations = lib.getLSData('locations') as Location[]
      locations.splice(idx, 1)

      lib.setLSData('locations', locations)  
    },

  },
  getters: {
    getWeather: state => state.weather,
    getLocations: state => state.locations

  }
})