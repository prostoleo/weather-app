import { defineStore } from "pinia";

export const useWeatherStore = defineStore('weather', {
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