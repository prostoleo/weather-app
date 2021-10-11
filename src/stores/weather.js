import { defineStore, createPinia } from 'pinia';

import { unref, isRef } from '@vue/reactivity';

// todo для того чтобы использовать pinia вне setup нужно - https://pinia.esm.dev/ssr/#using-the-store-outside-of-setup

import App from '~/App.vue';

const pinia = createPinia();
const app = createApp(App);
app.use(pinia);

export const useWeatherStore = defineStore('weather', {
  state: () => ({
    weather: null,
    query: '',
    coords: null
  }),
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