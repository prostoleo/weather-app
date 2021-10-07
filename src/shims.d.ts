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
  import { WEATHER_URL, API_KEY, TIME, HPA_TO_MM_OF_MERCURY } from '~/config/config.js';

  export const WEATHER_URL = WEATHER_URL;
  export const API_KEY = API_KEY;
  export const TIME = TIME;
  export const HPA_TO_MM_OF_MERCURY = HPA_TO_MM_OF_MERCURY;
}

declare module '~/data/data.js' {
  import { getCountryByCode } from '~/data/data.js';

  export const getCountryByCode = getCountryByCode;
}
declare module '~/helpers/helpers.js' {
  import { getLocalSunriseSunset } from '~/helpers/helpers.js';

  export const getLocalSunriseSunset = getLocalSunriseSunset;
}

declare module '~/stores/weather.js' {
  import { getCountryByCode } from '~/stores/weather.js';

  export const getCountryByCode = getCountryByCode;
}
declare module '~/composables/useWeather.js' {
  import { useWeather } from '~/composables/useWeather.js';

  export const useWeather = useWeather;
}
declare module '~/composables/useDate.js' {
  import { useDate } from '~/composables/useDate.js';

  export const useDate = useDate;
}
declare module '~/composables/useWind.js' {
  import { useWind } from '~/composables/useWind.js';

  export const useWind = useWind;
}

