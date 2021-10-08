<template>
  <div class="down-part__card card p-3 pt-0 bg-secondary1 relative rounded-2xl mt-7 max-w-500px md:(mt-0)">

    <header class="card__header flex justify-start items-center gap-x-4">

      <span class="title bg-secondary2 rounded-2xl font-light text-sm text-black80 p-3 absolute top-0 right-0"> {{ time }} </span>

      <div class="inline-flex items-center gap-x-3 mt-2">
        <img class="w-8"  :src="`http://openweathermap.org/img/w/${data.weather[0].icon}.png`" :alt="`иконка ${data?.weather[0].description}`">
        <h4 class="text-sm text-black font-semibold inline-flex items-center gap-x-2">
          <span>{{ Math.round(data?.temp) }}</span>
          <span>{{ data?.weather[0].description }}</span>
        </h4>
      </div>
    </header>

    <div class="card__body mt-5">

      <div class="card__row">
        <span class="key inline-flex items-center">
          Ощущается как

          <img class="w-6 ml-1" src="/icons/wind.svg" alt="">
        </span>

        <span class="value">
          {{ Math.round(data?.feels_like) }}
        </span>
        
      </div>
      <div class="card__row">
        <span class="key inline-flex items-center">
          Ветер, ю-в

          <img class="w-6 ml-1" src="/icons/wind.svg" alt="">
        </span>

        <span class="value">2 м/с</span>
        
      </div>
      <div class="card__row">
        <span class="key inline-flex items-center">
          Влажность

          <img class="w-6 ml-1" src="/icons/humidity.svg" alt="">
        </span>

        <span class="value">{{ data?.humidity }} %</span>
        
      </div>
      <div class="card__row">
        <span class="key inline-flex items-center text-left">
          <span>Давление, мм. рт. ст.</span>

          <img class="w-6 ml-1" src="/icons/wind.svg" alt="">
        </span>

        <span class="value block">{{ Math.round(data?.pressure * HPA_TO_MM_OF_MERCURY) }}</span>
        
      </div>
      <div class="card__row">
        <span class="key inline-flex items-center text-left">
          <span>Видимость, м.</span>

          <img class="w-6 ml-1" src="/icons/wind.svg" alt="">
        </span>

        <span class="value block">{{ data?.visibility }}</span>
        
      </div>
      <div class="card__row">
        <span class="key inline-flex items-center text-left">
          <span>Облачность, %</span>

          <img class="w-6 ml-1" src="/icons/wind.svg" alt="">
        </span>

        <span class="value block">{{ data?.clouds }}</span>
        
      </div>

    </div>

  </div>  
</template>

<script setup lang="ts">
  import { HPA_TO_MM_OF_MERCURY } from '~/config/config.js';
  import { getLocalSunriseSunset } from '~/helpers/helpers.js';

  // import { useDate } from '~/composables/useDate.js';
  // console.log('useDate: ', useDate);

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

  // console.log('props: ', props);

  //* получаем локальное время захода / рассвета
  const time = getLocalSunriseSunset(props.data?.dt, props.timezone);

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
    }
  }
</style>