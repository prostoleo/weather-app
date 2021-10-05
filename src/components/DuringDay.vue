<template>
  <div class="down-part__card card p-3 bg-secondary1 relative rounded-2xl mt-7">

    <header class="card__header flex justify-center items-center gap-x-4">
      <span class="title bg-secondary2 rounded-2xl font-light text-sm text-black80 p-3 absolute top-0 left-0"> {{ time }} </span>
      <div class="inline-flex gap-x-3">
        <img class="w-5"  :src="`http://openweathermap.org/img/w/${data.weather[0].icon}.png`" alt="">
        <h4 class="text-sm text-black font-semibold inline-flex gap-x-2">
          <span>{{ Math.round(data?.temp) }}</span>
          <span>Солнечно</span>
        </h4>
      </div>
    </header>

    <div class="card__body mt-5 flex flex-wrap items-center justify-between gap-x-2 gap-y-1">

      <div class="body__row inline-flex items-center w-max flex-grow gap-x-3">
        <span class="key inline-flex items-center">
          Ветер, ю-в

          <img class="w-6 ml-1" src="/icons/wind.svg" alt="">
        </span>

        <span class="value">2 м/с</span>
        
      </div>
      <div class="body__row flex items-center w-max flex-grow gap-x-3">
        <span class="key inline-flex items-center">
          Ветер, ю-в

          <img class="w-6 ml-1" src="/icons/wind.svg" alt="">
        </span>

        <span class="value">2 м/с</span>
        
      </div>
      <div class="body__row flex items-center w-max flex-grow gap-x-3">
        <span class="key inline-flex items-center">
          Ветер, ю-в

          <img class="w-6 ml-1" src="/icons/wind.svg" alt="">
        </span>

        <span class="value">2 м/с</span>
        
      </div>
      <div class="body__row flex items-center w-max flex-grow gap-x-3">
        <span class="key inline-flex items-center">
          Ветер, ю-в

          <img class="w-6 ml-1" src="/icons/wind.svg" alt="">
        </span>

        <span class="value">2 м/с</span>
        
      </div>

    </div>

  </div>  
</template>

<script setup lang="ts">
  import { useDate } from '~/composables/useDate.js';
  console.log('useDate: ', useDate);

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

  console.log('props: ', props);

  const locale = navigator.language;

  /* const time = Intl.DateTimeFormat(locale, {
    hour: '2-digit',
    minute: '2-digit'
  }).format(props.data?.dt); */
  /* const { compShortDateTime, getLocalDate, getLocalSunriseSunset } = useDate(props.data, props.timezone);
  console.log('compShortDateTime: ', compShortDateTime);
  console.log('getLocalSunriseSunset: ', getLocalSunriseSunset);

  const date = getLocalDate(props.timezone, props.data.dt);
  console.log('date: ', date); */

  const getLocalSunriseSunset = (time, timezone) => {
    const localTS = (time + timezone) * 1000;

    const date = new Date(localTS);
    console.log('date: ', date);

    const localOffset = date.getTimezoneOffset() * 60 * 1000;
    console.log('localOffset: ', localOffset);

    const newTS = localTS + localOffset;

    const newDate = new Date(newTS);

    return Intl.DateTimeFormat(locale, {
      hour: '2-digit',
      minute: '2-digit'
    }).format(newDate);
    // return Date.UTC(localTS);
  };

  const time = getLocalSunriseSunset(props.data?.dt, props.timezone);

</script>