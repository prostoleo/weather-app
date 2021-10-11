import { defineStore } from 'pinia';

import { unref, isRef } from '@vue/reactivity';

export const useWeatherStore = defineStore('weather', {
  state: () => {
    weather: null
    query: ''
    coords: null
  },
  getters: {
    getWeatherNow(state) {
      console.log('state: ', state);
      return state?.weather;
    },

    getCoords(state) {
      return state.coords;
    },

    getQuery(state) {
      return state.query;
    }
  },

  actions: {
    addWeatherNow(weather) {
      console.log('weather - addWeatherNow action: ', weather);
      // this.weather = unref(weather);
      this.weather = weather;
    },

    addCoords(coords) {
      console.log('coords in addCoords: ', coords);

      if (!coords) return;

      this.coords = coords;
      console.log('this.coords: ', this.coords);
    },

    addQuery(query) {
      console.log('query in action: ', query);
      this.query = query;
    }
  }
})