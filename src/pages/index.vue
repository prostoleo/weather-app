<template>
  <section class="min-h-screen pb-7">
    <Header @submit-form="showWeatherOnSearch" />
    <BaseContainer>
      <BaseSpinner v-if="loading" />
      <div v-else-if="error.status"   class="error pt-5 text-center text-white text-lg">
        Упс, что-то пошло не так 😞. Повторите запрос позже.
      </div>
      <div v-else-if="!loading && !getDataOneCallComputed && !gotGeoData" class="error pt-5 text-center text-white text-lg">
        Наберите название города в строке поиска или разрешите геолокацию
      </div>
      

      <div v-else-if="getDataOneCallComputed" class="content">
        <div class="upper-content text-center text-white pt-6">
          <h3 class="date text-sm opacity-80 uppercase">
            </h3>
            {{ compShortDateTime?.date }}
          <h3 class="time mt-1  text-sm opacity-80">
            </h3>
            {{ compShortDateTime?.time }}
          <h2 class="lоcation mt-3 ">
            {{ locationData?.display_name }}
          </h2>
          <h2 class="temperature mt-4 text-4xl  font-bold">
            {{ Math.round(getDataOneCallComputed?.current.temp) }}
          </h2>

          <h3 class="description mt-2">
            {{ getDataOneCallComputed?.current.weather[0].description }}
          </h3>

          <img :src="`http://openweathermap.org/img/w/${getDataOneCallComputed?.current.weather[0].icon}.png`" alt="облачно с прояснениями" class="description-img rounded-lg mx-auto mt-3 w-12">

          <!-- <div class="main-card mt-5 p-6 pb-7 w-max mx-auto bg-white rounded-3xl text-black flex justify-center gap-x-3 relative"> -->
          <div class="main-card mt-5 p-6 pb-7 w-max mx-auto bg-white rounded-3xl text-black flex justify-center gap-x-3 relative sm:(grid grid-cols-4)">

            <div class="col flex flex-col items-center justify-between">
              <img src="/icons/min.svg" alt="" class="icon w-5 h-5">
              <span class="value block font-bold">{{  Math.round(getDataOneCallComputed?.current.feels_like) }}</span>
              <span class="naming block">ощущ, &#8451</span>  
            </div>

            <div class="col flex flex-col items-center justify-between gap-y-1">
              <img src="/icons/max.svg" alt="" class="icon w-5 h-5">
              <span class="value block font-bold">{{  Math.round(getDataOneCallComputed?.current.pressure * HPA_TO_MM_OF_MERCURY) }}</span>
              <span class="naming block">мм.рт.ст</span>  
            </div>

            <div class="col flex flex-col items-center justify-between gap-y-1">
              <img src="/icons/humidity.svg" alt="" class="icon w-5 h-5">
              <span class="value block font-bold">{{  Math.round(getDataOneCallComputed?.current.humidity) }}%</span>
              <span class="naming block">влаж</span>  
            </div>

            <div class="col flex flex-col items-center justify-between gap-y-1">
              <img src="/icons/clouds.svg" alt="" class="icon w-5 h-5 opacity-50">
              <span class="value block font-bold">{{  Math.round(getDataOneCallComputed?.current.wind_speed) }} м/с
              </span>
              <span class="naming block">
                {{ windTextualDescription(getDataOneCallComputed?.current.wind_deg) }}
              </span>  
            </div>

            <router-link to="/details" class="bg-green-500 bg-accent rounded-2xl py-2 px-3 leading-none text-dark-900 text-sm inline-flex items-center justify-center align-baseline absolute top-full left-2/4 transform -translate-x-6/12 -translate-y-6/12 transition-all  hover:(opacity-90)">
              Подробнее
            </router-link>
          </div>  
        </div>

        <div class="days-wrapper mt-14">
          <h2 class="title font-bold w-max text-white py-1 border-b-2 border-b-accent border-opacity-0 transition-all duration-150 hover:(!border-opacity-100)">
            <router-link to="/forecast" class="text-white ">Прогноз на 7 дней</router-link>
          </h2>

          <div class="cards__wrapper mt-5 flex gap-x-3 items-center overflow-x-auto">
            <IndexForecastCard v-for="forecast in getDataOneCallComputed?.daily.slice(1)" :key="forecast" :data="forecast" />
            <!-- v-for="(forecast, index) in getDataOneCallComputed?.daily" :key="index" :data="forecast" -->

            <!-- :data="getDataOneCallComputed?.daily[0]" -->
            
          </div>
        </div>

        <!-- <pre class="text-white"> {{ getDataOneCallComputed?.daily[0] }} </pre> -->

        <!-- <pre class="text-gray-50 ">
          {{ data }}
        </pre> -->
        <pre class="text-gray-50 ">
          <!-- {{ getDataOneCallComputed }} -->
        </pre>
      
      </div>
      
    </BaseContainer>
  </section>
</template>

<script setup lang="ts">
// todo  получаем инфу из конфига
import { useWeather } from '~/composables/useWeather.js';
import { useDate } from '~/composables/useDate.js';
import { useWind } from '~/composables/useWind.js';

import { HPA_TO_MM_OF_MERCURY } from '~/config/config.js';

// todo получаем инфу по странам
// import { getCountryByCode } from '~/data/data.js';

import { useWeatherStore } from '~/stores/weather.js';

//* переменная для storage pinia
const store = useWeatherStore();

const forecasts = ref(null);

/* console.log('WEATHER_URL: ', WEATHER_URL);
console.log('API_KEY: ', API_KEY);
console.log('TIME: ', TIME); */

// todo используем composable с получением данных
const { dataOneCall, loading, error, gotGeoData, locationData, coords, getDataOneCallComputed, getGeocoding, getOneCallData } = useWeather();

// console.log('coords: ', coords);

/* console.log('dataOneCall: ', dataOneCall);
console.log('data: ', data);
console.log('getDataOneCallComputed.daily: ', getDataOneCallComputed.daily); */

forecasts.value = getDataOneCallComputed?.daily;
// forecasts.value.push(getDataOneCallComputed?.value.daily);

//=====================================
// todo используем composable для получения даты
const { compShortDateTime } = useDate(getDataOneCallComputed);
// console.log('compShortDateTime: ', compShortDateTime);
// console.log('getLocalDate: ', getLocalDate);

// todo используем composable для получения даты
const { windDirection, windTextualDescription } = useWind(getDataOneCallComputed);
// console.log('windDirection: ', windDirection);
// console.log('windTextualDescription: ', windTextualDescription);

async function showWeatherOnSearch(searchQuery: string) {
  console.log('searchQuery: ', searchQuery);

  const { coords } = await getGeocoding(searchQuery); 
  console.log('coords: ', coords);

  //* добавляем поисковый запрос в store
  store.addQuery(searchQuery);
  //* добавляем координаты в store
  store.addCoords(coords);

  await getOneCallData();
  console.log('dataOneCall: ', dataOneCall);

}

// todo получаем имя страны
/* const getCountryName = computed(() => {
  return getCountryByCode(getDataOneCallComputed.value?.sys.country)
}) */

// const data = await getWeatherData();
</script>

<style lang="scss" scoped>
@use '../styles/main.scss' as *;

section {
  // background: url("/public/img/bg/bg-main.jpg");
  background: url(https://images.unsplash.com/photo-1543699936-c901ddbf0c05?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80) $black40;
  background-blend-mode: overlay;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}

// .upper-content {
//   padding-top: 2.5rem;

//   text-align: center;

//   h3.date {
//     font-size: 1rem;
//     font-weight: 400;
//     color: $white80;

//     margin-bottom: 0.5em;
//     text-transform: uppercase;
//   }

//   h3.time {
//     font-size: 1rem;
//     font-weight: 400;
//     color: $white80;

//     margin-bottom: 2.5em;
//     text-transform: uppercase;
//   }

//   h2.lоcation {
//     font-size: 1.4rem;
//     font-weight: 400;
//     color: $white;

//     margin-bottom: 2.5em;
//   }

//   h2.temperature {
//     font-size: 3.6rem;
//     font-weight: 700;
//     color: $white;

//     margin-bottom: 0.5em;
//   }

//   h3.description {
//     font-size: 1.2rem;
//     font-weight: 400;
//     color: $white;

//     margin-bottom: 1em;
//   }

//   img.description-img {
//     margin: 0 auto;
//   }

//   .main-card {
//     position: relative;

//     max-width: 20rem;
//     margin: 0 auto;

//     border-radius: 1.5rem;
//     padding: 1.5em;
//     padding-bottom: 2.25em;

//     display: flex;
//     justify-content: space-between;
//     align-items: center;

//     background: $white;

//     .col {
//       display: flex;
//       flex-direction: column;
//       align-items: center;
//       img.icon {
//         width: 2rem;
//       }
//       span.value {
//         font-size: 1.4rem;
//         font-weight: 700;
//         color: $black;
//       }
//       span.naming {
//         font-size: 1.2rem;
//         font-weight: 300;
//         color: $black;
//       }
//     }

//     button.details {
//       position: absolute;
//       top: 100%;
//       left: 50%;

//       transform: translate(-50%, -50%);

//       display: inline-flex;
//       align-items: center;
//       justify-content: center;

//       border-radius: 1.5rem;
//       background: $accent;


//       font-size: 1.4rem;
//       padding: 0.5em 1em;
//       line-height: 1;

//       text-align: top;
//     }
//   }
// }

// .days-wrapper {
//   h2.title {
//     a {}
//   }

//   .cards__wrapper {
//     .card {
//       span.day {}
//       img {}
//       span.temperature {}
//     }
//   }
// }

</style>

<route lang="yaml">
meta:
  layout: home
</route>