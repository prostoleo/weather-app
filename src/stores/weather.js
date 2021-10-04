import { defineStore } from "pinia";

export const useWeatherNowStore = defineStore('weather-now', {
  state: () => {
    weather: null
    query: ''
  },
  getters: {
    getWeatherNow(state) {
      return state?.data;
    }
  },

  actions: {
    addWeatherNow(data) {
      this.weather = data;
    }
  }
})