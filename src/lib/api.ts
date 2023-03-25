const WEATHER_API_URL = import.meta.env.VITE_WEATHER_API_URL
const WEATHER_TOKEN = import.meta.env.VITE_WEATHER_TOKEN
const IPINFO_URL = import.meta.env.VITE_IPINFO_URL

import type { UserLocation, Weather } from "./types"

export const api = {
  getWeather: (city: string, country: string | null = null) => {
    return new Promise<Weather>((resolve, reject) => {
      const URLQuery = country ? `${city},${country}` : `${city}`;

      fetch(`${WEATHER_API_URL}weather?q=${URLQuery}&units=metric&appid=${WEATHER_TOKEN}`)
        .then(res => res.json())
        .then(res => resolve(res))
        .catch(() => reject())
    })
  },
  
  getUserLocation: () => {
    return new Promise<UserLocation>((resolve, reject) => {
      fetch(IPINFO_URL)
        .then(res => res.json())
        .then(res => resolve(res))
        .catch(() => reject())
    })
  }
}