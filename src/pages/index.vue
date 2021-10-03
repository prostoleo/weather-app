<template>
  <section>
    <BaseContainer>
      <span v-if="loading" class="text-yellow-400">loading...</span>
      <div v-else-if="!loading" class="upper-content text-center text-white pt-6">
        <h3 class="date  text-sm opacity-80 uppercase">
          {{ getData.dt }}
        </h3>
        <h3 class="time mt-1  text-sm opacity-80">
          13:57
        </h3>
        <h2 class="lоcation mt-3 ">
          {{ getData.name }}, Российская Федерация
        </h2>
        <h2 class="temperature mt-4 text-4xl  font-bold">
          {{ Math.round(getData.main.temp) }}
        </h2>

        <h3 class="description mt-2">
          {{ getData.weather[0].description }}
        </h3>

        <img :src="`http://openweathermap.org/img/w/${getData.weather[0].icon}.png`" alt="облачно с прояснениями" class="description-img mx-auto mt-3 w-10">

        <div class="main-card mt-5 p-6 pb-7 w-max mx-auto bg-white rounded-3xl text-black flex justify-center gap-x-3 relative">
          <div class="col flex flex-col items-center justify-between">
            <img src="/icons/min.svg" alt="" class="icon w-5 h-5">
            <span class="value block font-bold">{{  Math.round(getData.main.temp_min) }}</span>
            <span class="naming block">мин</span>  
          </div>
          <div class="col flex flex-col items-center justify-between gap-y-1">
            <img src="/icons/max.svg" alt="" class="icon w-5 h-5">
            <span class="value block font-bold">{{ Math.round(getData.main.temp_max) }}</span>
            <span class="naming block">макс</span>  
          </div>
          <div class="col flex flex-col items-center justify-between gap-y-1">
            <img src="/icons/humidity.svg" alt="" class="icon w-5 h-5">
            <span class="value block font-bold">{{ getData.main.humidity }}%</span>
            <span class="naming block">влаж</span>  
          </div>
          <div class="col flex flex-col items-center justify-between gap-y-1">
            <img src="/icons/clouds.svg" alt="" class="icon w-5 h-5 opacity-50">
            <span class="value block font-bold">{{ getData.wind.speed.toFixed(1) }} м/с</span>
            <span class="naming block">{{ getData.wind.deg }}</span>  
          </div>

          <button class="bg-green-500 bg-accent rounded-2xl py-2 px-3 leading-none text-dark-900 text-sm inline-flex items-center justify-center align-baseline absolute top-full left-2/4 transform -translate-x-6/12 -translate-y-6/12">
            Подробнее
          </button>
          <!-- <button class="details">Подробнее</button> -->
        </div>
      </div>

      <div class="days-wrapper mt-14">
        <h2 class="title font-bold text-white ">
          <router-link to="/days" class="text-white py-1 border-b-1 border-b-accent border-opacity-0 transition-all duration-150 hover:!border-opacity-100">Прогноз на 7 дней</router-link>
        </h2>

        <div class="cards__wrapper mt-5 flex gap-x-3 items-center overflow-x-auto">
          <div class="card px-6 py-3 bg-white rounded-3xl flex flex-col items-center gap-y-1">
            <span class="day uppercase text-sm">сб</span>
            <img src="/icons/clouds.svg" alt="" class="w-5 h-5">
            <span class="temperature font-bold">+7</span>
          </div>
          <div class="card px-6 py-3 bg-white rounded-3xl flex flex-col items-center gap-y-1">
            <span class="day uppercase text-sm">сб</span>
            <img src="/icons/clouds.svg" alt="" class="w-5 h-5">
            <span class="temperature font-bold">+7</span>
          </div>
          <div class="card px-6 py-3 bg-white rounded-3xl flex flex-col items-center gap-y-1">
            <span class="day uppercase text-sm">сб</span>
            <img src="/icons/clouds.svg" alt="" class="w-5 h-5">
            <span class="temperature font-bold">+7</span>
          </div>
          <div class="card px-6 py-3 bg-white rounded-3xl flex flex-col items-center gap-y-1">
            <span class="day uppercase text-sm">сб</span>
            <img src="/icons/clouds.svg" alt="" class="w-5 h-5">
            <span class="temperature font-bold">+7</span>
          </div>
          <div class="card px-6 py-3 bg-white rounded-3xl flex flex-col items-center gap-y-1">
            <span class="day uppercase text-sm">сб</span>
            <img src="/icons/clouds.svg" alt="" class="w-5 h-5">
            <span class="temperature font-bold">+7</span>
          </div>
          <div class="card px-6 py-3 bg-white rounded-3xl flex flex-col items-center gap-y-1">
            <span class="day uppercase text-sm">сб</span>
            <img src="/icons/clouds.svg" alt="" class="w-5 h-5">
            <span class="temperature font-bold">+7</span>
          </div>
          <div class="card px-6 py-3 bg-white rounded-3xl flex flex-col items-center gap-y-1">
            <span class="day uppercase text-sm">сб</span>
            <img src="/icons/clouds.svg" alt="" class="w-5 h-5">
            <span class="temperature font-bold">+7</span>
          </div>
          
        </div>
      </div>

      <pre class="text-gray-50 ">
          {{ data }}
        </pre>
    </BaseContainer>
  </section>
</template>

<script setup lang="ts">
  import { WEATHER_URL, API_KEY, TIME } from '~/config/config.js';

  console.log('WEATHER_URL: ', WEATHER_URL);
  console.log('API_KEY: ', API_KEY);
  console.log('TIME: ', TIME);

  const data = ref({});
  const loading = ref(false);

  watch(getWeatherData, (newVal) => {
    console.log('newVal: ', newVal);
    // data.value = await newVal;
  });
  /* watch({
    handler: getWeatherData,
    immediate: true
  }); */
  const getData = computed(() => data.value);

  async function getWeatherData() {
    try {
      loading.value = true;
      const response = await fetch(`${WEATHER_URL}?q=Норильск,ru&units=metric&appid=${API_KEY}&lang=ru`);

      const result = await response.json();

      data.value = result;

      
      // return result;
    } catch (error) {
      console.log(`💣💣💣 ${error}`);
    } finally {
      loading.value = false;
    }
  };

  // const data = await getWeatherData();
</script>

<style lang="scss" scoped>
@use '../styles/main.scss' as *;

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