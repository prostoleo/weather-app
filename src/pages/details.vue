<template>
  <section class="bg-primary min-h-screen pb-10">
    <Header :not-home="true" />
    <BaseContainer>
      <BaseSpinner v-if="loading" />
      <div v-else-if="error.status" class="error text-center text-black text-lg">
        Упс, что-то пошло не так 😞. Повторите запрос позже.
      </div>
      <div v-else-if="getDataOneCallComputed" class="content text-center pt-5">
        <div class="upper-content text-center text-black">
          <h3 class="date text-sm opacity-80 uppercase">
            {{ compShortDateTime?.date }}
          </h3>
          <h3 class="time mt-1 text-sm opacity-80">
            {{ compShortDateTime?.time }}
          </h3>
          <h2 class="lоcation mt-3 ">
            {{ locationData?.display_name }}
          </h2>
          <h2 class="temperature mt-4 text-4xl  font-bold">
            {{ Math.round(getDataOneCallComputed?.current.temp) }}
          </h2>

          <h3 class="description mt-2">
            {{ getDataOneCallComputed?.current.weather[0].description }}
          </h3>

          <img 
            :src="`http://openweathermap.org/img/w/${getDataOneCallComputed?.current.weather[0].icon}.png`" 
            alt="облачно с прояснениями" class="description-img mx-auto mt-3 w-10"
          >

          <div class="main-card mt-5 mb-8 p-6 pb-8 max-w-18rem mx-auto bg-secondary1 rounded-2xl text-black flex flex-col justify-center gap-y-1 drop-shadow-lg">

            <div class="main-card__row flex items-center justify-between gap-x-5 text-left">
              <span class="key text-sm font-thin text-black80 block w-8/12">
                Ощущается как, &#8451;
              </span>
              <span class="value font-semibold text-black block w-3/12">
                {{ Math.round(getDataOneCallComputed?.current.feels_like) }}
              </span>
            </div>
            <div class="main-card__row flex items-center justify-between gap-x-5 text-left">
              <span class="key text-sm font-thin text-black80 block w-8/12">
                Мин., &#8451;
              </span>
              <span class="value font-semibold text-black block w-3/12">
                {{ Math.round(getDataOneCallComputed?.daily[0].temp.min) }}
              </span>
            </div>
            <div class="main-card__row flex items-center justify-between gap-x-3 text-left">
              <span class="key text-sm font-thin text-black80 block w-8/12">
                Макс., &#8451;
              </span>
              <span class="value font-semibold text-black block w-3/12">
                {{ Math.round(getDataOneCallComputed?.daily[0].temp.max) }}
              </span>
            </div>
            <div class="main-card__row flex items-center justify-between gap-x-3 text-left">
              <span class="key text-sm font-thin text-black80 block w-8/12">
                Влажность, %
              </span>
              <span class="value font-semibold text-black block w-3/12">
                {{ Math.round(getDataOneCallComputed?.daily[0].humidity) }}
              </span>
            </div>
            <div class="main-card__row flex items-center justify-between gap-x-3 text-left">
              <span class="key text-sm font-thin text-black80 block w-8/12">
                Давление, мм.рт.ст.
              </span>
              <span class="value font-semibold text-black block w-3/12">
                {{ Math.round(getDataOneCallComputed?.daily[0].pressure * HPA_TO_MM_OF_MERCURY) }}
              </span>
            </div>
            <div class="main-card__row flex items-center justify-between gap-x-3 text-left">
              <span class="key text-sm font-thin text-black80 block w-8/12">
                Видимость, м.
              </span>
              <span class="value font-semibold text-black block w-3/12">
                {{ getDataOneCallComputed?.current.visibility }} 
              </span>
            </div>
            <div class="main-card__row flex items-center justify-between gap-x-3 text-left">
              <span class="key text-sm font-thin text-black80 block w-8/12">
                Облачность, %
              </span>
              <span class="value font-semibold text-black block w-3/12">
                {{ getDataOneCallComputed?.current.clouds }}
              </span>
            </div>
            <!-- <div class="main-card__row flex items-center justify-between gap-x-5 text-left">
              <span class="key text-sm font-thin text-black80 block w-6/12">
                Восход
              </span>
              <span class="value font-semibold text-black block w-6/12">
                {{ getDataOneCallComputed.sys.sunrise }}
              </span>
            </div> -->
            <!-- <div class="main-card__row flex items-center justify-start gap-x-5 text-left">
              <span class="key text-sm font-thin text-black80 block w-6/12">
                Закат
              </span>
              <span class="value font-semibold text-black block w-6/12">
                {{ getDataOneCallComputed.sys.sunset }}
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
                <p class="text-sm text-left">{{ windTextualDescription(getDataOneCallComputed?.current.wind_deg) }}, {{ getDataOneCallComputed?.current.wind_speed.toFixed(1) }} м/с</p>
                <p class="text-sm text-left mt-1" v-if="getDataOneCallComputed?.daily[0].wind_gust">c порывами, до {{ getDataOneCallComputed?.daily[0].wind_gust.toFixed(1) }} м/с</p>
              </div>
            </div>

            <div class="right flex flex-col w-12/12 max-w-300px">
              <h2 class="inline-flex gap-x-3 justify-start items-center font-bold mb-4">
                День
                <img src="/icons/rain.svg" alt="">
              </h2>

              <div class="card p-2 rounded-2xl bg-secondary1">
                <!-- <p class="text-sm text-left">Восход - {{ getLocalDate(getDataOneCallComputed.sys.sunrise) }}</p> -->

                <p class="text-sm text-left">Восход - <b>{{ sunriseComp }}</b></p>

                <p class="text-sm text-left mt-1">Закат - <b>{{ sunsetComp }}</b></p>

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
// import { getCountryByCode } from '~/data/data.js';

import { useWeather } from '~/composables/useWeather.js';
import { useDate } from '~/composables/useDate.js';
import { useWind } from '~/composables/useWind.js';

// todo используем composable с получением данных
const { loading, error, gotGeoData, locationData, coords, getDataOneCallComputed } = useWeather();

// console.log('getDataOneCallComputed: ', getDataOneCallComputed);
// console.log('gotGeoData: ', gotGeoData);
// console.log('coords: ', coords);
// console.log('data: ', data);
// console.log('getDataOneCallComputed: ', getDataOneCallComputed);

// todo используем composable для получения даты
const { compShortDateTime, getLocalSunriseSunset } = useDate(getDataOneCallComputed);
// console.log('getLocalDate: ', getLocalDate);

// todo используем composable для получения даты
const { windTextualDescription } = useWind(getDataOneCallComputed);
// console.log('windTextualDescription: ', windTextualDescription);

// todo считаем параметры дня
/* const durationOfDay = () => {
  // if (!getDataOneCallComputed.value.sys) return;

  const durationSec = getDataOneCallComputed?.current?.sunset - getDataOneCallComputed?.current?.sunrise;

  const hours = Math.trunc(durationSec / 3600);
  // console.log('hours: ', hours);
  const minutes = Math.floor((durationSec - hours * 3600) / 60);
  // console.log('minutes: ', minutes);

  return `${hours} ч. ${minutes} мин.`;
}; */

const durationOfDay = computed(() => {
  const durationSec = getDataOneCallComputed?.value?.current?.sunset - getDataOneCallComputed?.value?.current?.sunrise;

  const hours = Math.trunc(durationSec / 3600);
  // console.log('hours: ', hours);
  const minutes = Math.floor((durationSec - hours * 3600) / 60);
  // console.log('minutes: ', minutes);

  return `${hours} ч. ${minutes} мин.`;
})

const sunriseComp = computed(() => {
  return getLocalSunriseSunset(getDataOneCallComputed?.value?.current?.sunrise, getDataOneCallComputed?.value?.timezone_offset);
})


const sunsetComp = computed(() => {
  return getLocalSunriseSunset(getDataOneCallComputed?.value?.current?.sunset, getDataOneCallComputed?.value?.timezone_offset);
})



  // todo получаем имя страны
/* const getCountryName = computed(() => {
  return getCountryByCode(getDataOneCallComputed.value?.sys.country)
}) */

</script>

<style lang="scss" scoped>
  
</style>

<route lang="yaml">
meta:
  layout: default
</route>
