<template>
  <section class="bg-primary min-h-screen pb-10">
    <Header :not-home="true" />
    <BaseContainer>
      <BaseSpinner v-if="loading" />
      <div v-else-if="!loading && !getDataComputed" class="error text-center text-white text-lg">
        Упс, что-то пошло не так 😞. Повторите запрос позже.
      </div>
      <div v-else class="content text-center pt-5">
        <div class="upper-content text-center text-black">
          <h3 class="date text-sm opacity-80 uppercase">
            {{ compShortDateTime?.date }}
          </h3>
          <h3 class="time mt-1 text-sm opacity-80">
            {{ compShortDateTime?.time }}
          </h3>
          <h2 class="lоcation mt-3 ">
            {{ getDataComputed.name }}, {{ getCountryName }}
          </h2>
          <h2 class="temperature mt-4 text-4xl  font-bold">
            {{ Math.round(getDataComputed.main.temp) }}
          </h2>

          <h3 class="description mt-2">
            {{ getDataComputed.weather[0].description }}
          </h3>

          <img 
            :src="`http://openweathermap.org/img/w/${getDataComputed.weather[0].icon}.png`" 
            alt="облачно с прояснениями" class="description-img mx-auto mt-3 w-10"
          >

          <div class="main-card mt-5 mb-8 p-6 pb-8 max-w-18rem mx-auto bg-secondary1 rounded-2xl text-black flex flex-col justify-center gap-y-1 drop-shadow-lg">

            <div class="main-card__row flex items-center justify-between gap-x-5 text-left">
              <span class="key text-sm font-thin text-black80 block w-8/12">
                Ощущается как, &#8451;
              </span>
              <span class="value font-semibold text-black block w-3/12">
                {{  Math.round(getDataComputed.main.feels_like) }}
              </span>
            </div>
            <div class="main-card__row flex items-center justify-between gap-x-5 text-left">
              <span class="key text-sm font-thin text-black80 block w-8/12">
                Мин., &#8451;
              </span>
              <span class="value font-semibold text-black block w-3/12">
                {{ Math.round(getDataComputed.main.temp_min) }}
              </span>
            </div>
            <div class="main-card__row flex items-center justify-between gap-x-3 text-left">
              <span class="key text-sm font-thin text-black80 block w-8/12">
                Макс., &#8451;
              </span>
              <span class="value font-semibold text-black block w-3/12">
                {{ Math.round(getDataComputed.main.temp_max) }}
              </span>
            </div>
            <div class="main-card__row flex items-center justify-between gap-x-3 text-left">
              <span class="key text-sm font-thin text-black80 block w-8/12">
                Влажность
              </span>
              <span class="value font-semibold text-black block w-3/12">
                {{ getDataComputed.main.humidity }} %
              </span>
            </div>
            <div class="main-card__row flex items-center justify-between gap-x-3 text-left">
              <span class="key text-sm font-thin text-black80 block w-8/12">
                Давление, мм.рт.ст.
              </span>
              <span class="value font-semibold text-black block w-3/12">
                {{ Math.round(getDataComputed.main.pressure * HPA_TO_MM_OF_MERCURY) }}
              </span>
            </div>
            <div class="main-card__row flex items-center justify-between gap-x-3 text-left">
              <span class="key text-sm font-thin text-black80 block w-8/12">
                Видимость, м.
              </span>
              <span class="value font-semibold text-black block w-3/12">
                {{ getDataComputed.visibility }} 
              </span>
            </div>
            <div class="main-card__row flex items-center justify-between gap-x-3 text-left">
              <span class="key text-sm font-thin text-black80 block w-8/12">
                Облачность, %
              </span>
              <span class="value font-semibold text-black block w-3/12">
                {{ getDataComputed.clouds.all }}
              </span>
            </div>
            <!-- <div class="main-card__row flex items-center justify-between gap-x-5 text-left">
              <span class="key text-sm font-thin text-black80 block w-6/12">
                Восход
              </span>
              <span class="value font-semibold text-black block w-6/12">
                {{ getDataComputed.sys.sunrise }}
              </span>
            </div> -->
            <!-- <div class="main-card__row flex items-center justify-start gap-x-5 text-left">
              <span class="key text-sm font-thin text-black80 block w-6/12">
                Закат
              </span>
              <span class="value font-semibold text-black block w-6/12">
                {{ getDataComputed.sys.sunset }}
              </span>
            </div> -->

          </div>
          
          <div class="two-cards flex items-stretch gap-x-3">

            <div class="left flex flex-col  w-12/12 max-w-300px">
              <h2 class="inline-flex gap-x-3 justify-start items-center font-bold mb-4">
                Ветер
                <img src="/icons/wind.svg" alt="">
              </h2>

              <div class="card p-2 rounded-2xl bg-secondary1">
                <p class="text-sm text-left">{{ windDirection }}, {{ getDataComputed.wind.speed.toFixed(1) }} м/с</p>
                <p class="text-sm text-left mt-1" v-if="getDataComputed.wind.gust">c порывами, до {{ getDataComputed.wind.gust.toFixed(1) }} м/с</p>
              </div>
            </div>

            <div class="right flex flex-col w-12/12 max-w-300px">
              <h2 class="inline-flex gap-x-3 justify-start items-center font-bold mb-4">
                День
                <img src="/icons/rain.svg" alt="">
              </h2>

              <div class="card p-2 rounded-2xl bg-secondary1">
                <!-- <p class="text-sm text-left">Восход - {{ getLocalDate(getDataComputed.sys.sunrise) }}</p> -->
                <p class="text-sm text-left">Восход - <b>{{ getLocalSunriseSunset(getDataComputed.sys.sunrise, getDataComputed.timezone) }}</b></p>

                <p class="text-sm text-left mt-1">Закат - <b>{{ getLocalSunriseSunset(getDataComputed.sys.sunset, getDataComputed.timezone) }}</b></p>

                <p class="text-sm text-left mt-1">Продолжительность дня - <b>{{ durationOfDay }}</b></p>
              </div>
            </div>


          </div>
        </div>

        <div class="down-part mt-6">
          <h2 class="title font-bold text-left mb-5 text-black">
            В течение суток
          </h2>

          <div class="down-part__wrapper md:(grid grid-cols-2 gap-5)">
            <DuringDayCard v-for="hour in getDataOneCallComputed?.hourly.slice(1, 25)" :key="hour" :data="hour" :timezone="getDataOneCallComputed?.timezone_offset" />

            
          </div>
          <pre>
              <!-- {{ getDataOneCallComputed }} -->
            </pre>
            <pre>
              {{ getDataOneCallComputed?.hourly.slice(0, 1)}}
              <!-- {{ getDataOneCallComputed?.hourly.slice(0, 25)}} -->
            </pre>
        </div>

      </div>
      
    </BaseContainer>
  </section>
</template>

<script setup lang="ts">
import { HPA_TO_MM_OF_MERCURY } from '~/config/config.js';

import DuringDayCard from '~/components/DuringDayCard.vue';

// todo получаем инфу по странам
import { getCountryByCode } from '~/data/data.js';

import { useWeather } from '~/composables/useWeather.js';
import { useDate } from '~/composables/useDate.js';
import { useWind } from '~/composables/useWind.js';

// todo используем composable с получением данных
const { data, loading, getDataComputed, getDataOneCallComputed } = useWeather();
console.log('data: ', data);
console.log('getDataOneCallComputed: ', getDataOneCallComputed);

// todo используем composable для получения даты
const { compShortDateTime, getLocalDate, getLocalSunriseSunset } = useDate(getDataComputed);
console.log('getLocalDate: ', getLocalDate);

// todo используем composable для получения даты
const { windDirection, windTextualDescription } = useWind(getDataComputed);
console.log('windTextualDescription: ', windTextualDescription);

// todo считаем параметры дня
  const durationOfDay = computed(() => {
    if (!getDataComputed.value.sys) return;

    const durationSec = getDataComputed.value.sys.sunset - getDataComputed.value.sys.sunrise;

    const hours = Math.trunc(durationSec / 3600);
    console.log('hours: ', hours);
    const minutes = Math.floor((durationSec - hours * 3600) / 60);
    console.log('minutes: ', minutes);

    return `${hours} ч. ${minutes} мин.`;
  })

  // todo получаем имя страны
const getCountryName = computed(() => {
  return getCountryByCode(getDataComputed.value?.sys.country)
})

</script>

<style lang="scss" scoped>
  
</style>

<route lang="yaml">
meta:
  layout: default
</route>
