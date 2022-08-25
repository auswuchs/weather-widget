import { api } from '@/lib/api'
import type { Weather, Location } from "./types";

export const lib = { 

  getLSData<T>(dataName: string): T | null {
    return Object.prototype.hasOwnProperty.call(localStorage, dataName)
      ? JSON.parse(localStorage.getItem(dataName) || '')
      : null
  },
  
  setLSData<T>(dataName: string, data: T) {
    localStorage.setItem(dataName, JSON.stringify(data))
  },

  async getWeatherInfo(locations: Location[]) {
    const result = <Weather[]>[];

    await locations.reduce(async (promise, location) => {
      await promise;
      const weather = await api.getWeather(location.name);
      result.push(weather);
    }, Promise.resolve());
    return result;
  },
}