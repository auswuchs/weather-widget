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

  moveItemInArray<T>(array: T[], fromIndex: number, toIndex: number) {
    const arr = [...array];
    const from = fromIndex;
    const to = toIndex;

    if (from === to) {
      return arr;
    }

    const target = arr[from];
    const delta = to < from ? -1 : 1;

    for (let i = from; i !== to; i += delta) {
      arr[i] = arr[i + delta];
    }

    arr[to] = target;
    return arr;
  },

  capitalizeFirstLetter (str: string) { return str.charAt(0).toUpperCase() + str.slice(1) },

}