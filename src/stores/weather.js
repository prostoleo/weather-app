import { defineStore } from "pinia";

import { unref, isRef } from "@vue/reactivity";

export const useWeatherStore = defineStore('weather', {
  state: () => {
    weather: null
    query: ''
    coords: null

  },
  getters: {
    getWeatherNow(state) {
      return state?.data;
    },

    getCoords(state) {
      return state?.coords;
    }
  },

  actions: {
    addWeatherNow(data) {
      console.log('data: ', data);
      console.log('isRef: ', isRef(data));
      // console.log('data.value: ', data.value);
      console.log('data._value._target: ', data?._value?._target);
      // console.log('data: ', data);
      console.log('unref(data): ', unref(data));
      this.weather = unref(data);
    },

    addCoords(data) {
      console.log('data: ', data);

      if (!data) return;

      this.coords = data;
      console.log('this.coords: ', this.coords);
    }
  }
})