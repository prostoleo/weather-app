/* eslint-disable import/no-duplicates */

declare interface Window {
  // extend the window
}

// with vite-plugin-md, markdowns can be treat as Vue components
declare module '*.md' {
  import { ComponentOptions } from 'vue'
  const component: ComponentOptions
  export default component
}

declare module '~/config/config.js' {
  import { WEATHER_URL, API_KEY, TIME } from '~/config/config.js';

  export const WEATHER_URL = WEATHER_URL;
  export const API_KEY = API_KEY;
  export const TIME = TIME;
}

