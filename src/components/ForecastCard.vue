<template>
  <div class="card p-3 pt-0 bg-secondary1 relative rounded-2xl mt-7 max-w-500px md:(mt-0)">

    <header class="card__header flex justify-start items-center gap-x-4 pt-3">

      <span class="title bg-secondary2 rounded-2xl font-light text-sm text-black80 p-3 absolute top-0 right-0">
        {{ time }}
      </span>

      <div class="inline-flex items-center gap-x-3 ml-3">
        <img class="w-7" :src="`http://openweathermap.org/img/w/${data.weather[0].icon}.png`" :alt="`иконка ${data?.weather[0].description}`">
        <h4 class="text-sm text-black font-semibold inline-flex gap-x-2">
          <span>{{ Math.round(data?.temp.day) }}</span>
          <span>{{ data?.weather[0].description }}</span>
        </h4>
      </div>

    </header>

    <div class="card__body mt-7 flex flex-wrap items-center justify-between gap-x-2 gap-y-1">

      <div class="card__row">
        <span class="key inline-flex items-center">
          Ветер, {{ windDirection }}, м/с

          <img class="w-6 ml-1" src="/icons/wind.svg" alt="">
        </span>

        <span class="value font-bold">{{ data?.wind_speed.toFixed(1) }}</span>
        
      </div>

      <div class="card__row" v-if="data?.wind_gust">
        <span class="key inline-flex items-center">
          С порывами до, м/с

          <img class="w-6 ml-1" src="/icons/wind.svg" alt="">
        </span>

        <span class="value font-bold">{{ data?.wind_gust.toFixed(1) }}</span>
        
      </div>

      <div class="card__row">
        <span class="key inline-flex items-center">
          Давление, мм.рт.ст.

          <img class="w-6 ml-1" src="/icons/wind.svg" alt="">
        </span>

        <span class="value font-bold">{{ Math.round(data?.pressure * HPA_TO_MM_OF_MERCURY)}}</span>
        
      </div>

      <div class="card__row">
        <span class="key inline-flex items-center">
          Влажность, %

          <img class="w-6 ml-1" src="/icons/humidity.svg" alt="">
        </span>

        <span class="value font-bold">{{data?.humidity}}</span>
        
      </div>

      <div class="card__row">
        <span class="key inline-flex items-center">
          Облачность, % 

          <img class="w-6 ml-1" src="/icons/wind.svg" alt="">
        </span>

        <span class="value font-bold">{{ data?.clouds }}</span>
        
      </div>

      <div class="card__row">
        <span class="key inline-flex items-center">
          Мин, &#8451

          <img class="w-6 ml-1" src="/icons/wind.svg" alt="">
        </span>

        <span class="value font-bold">
          {{ Math.round(data?.temp.min) }}
        </span>
        
      </div>

      <div class="card__row">
        <span class="key inline-flex items-center">
          Макс, &#8451

          <img class="w-6 ml-1" src="/icons/wind.svg" alt="">
        </span>

        <span class="value font-bold">
          {{ Math.round(data?.temp.max) }}
        </span>
        
      </div>

      <div class="card__row">
        <span class="key inline-flex items-center">
          Восход

          <img class="w-6 ml-1" src="/icons/wind.svg" alt="">
        </span>

        <span class="value font-bold">{{ timeOfSunrise }}</span>
        
      </div>

      <div class="card__row">
        <span class="key inline-flex items-center">
          Закат

          <img class="w-6 ml-1" src="/icons/wind.svg" alt="">
        </span>

        <span class="value font-bold">
          {{ timeOfSunset }}
        </span>
        
      </div>
      
    </div>
  </div>
</template>

<script setup lang="ts">
import { useWind } from '~/composables/useWind.js';
import { HPA_TO_MM_OF_MERCURY } from '~/config/config.js';

import { getLocalSunriseSunset } from '~/helpers/helpers.js';

  const props = defineProps({
    data: {
      type: Object,
      default: null,
      required: true
    },
    timezone: {
      type: Number,
      default: null,
      required: true
    }
  });

  // console.log('props - forecast card: ', props);

  /* function showDate() {
    if (!props.data.dt) return;


  } */
  const locale = navigator.language;

  const getLocalDate = (time:number , timezone:number) => {
    const localTS = (time + timezone) * 1000;

    const date = new Date(localTS);
    // console.log('date: ', date);

    const localOffset = date.getTimezoneOffset() * 60 * 1000;
    // console.log('localOffset: ', localOffset);

    const newTS = localTS + localOffset;

    const newDate = new Date(newTS);

    return Intl.DateTimeFormat(locale, {
      weekday: 'short',
      day: '2-digit',
      month: '2-digit'
    }).format(newDate);
    // return Date.UTC(localTS);
  };

  const time = getLocalDate(props.data?.dt, props.timezone);

  // ==================
  // todo ветер
  const { windTextualDescription } = useWind();

  const windDirection = windTextualDescription(props.data?.wind_speed);

  //* получаем локальное время захода / рассвета
  const timeOfSunrise = getLocalSunriseSunset(props.data?.sunrise, props.timezone);
  const timeOfSunset = getLocalSunriseSunset(props.data?.sunset, props.timezone);
</script>

<style lang="scss" scoped>
  .card__body {
    display: grid !important;
    grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)) !important;
    gap: 1.25rem 2.5rem  !important;
    grid-auto-flow: row !important;

    .card__row {
      // width: max-content;

      display: inline-flex;
      align-items: center;

      justify-content: space-between;

      flex-wrap: wrap;
    }
  }
</style>