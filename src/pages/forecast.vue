<template>
  <section class="bg-primary min-h-screen pb-10">
    <Header :not-home="true" />
    <BaseContainer>
      
      <BaseSpinner v-if="loading && !getDataOneCallComputed" />
      <div v-else-if="error.status"   class="error pt-5 text-center text-white text-lg">
        Упс, что-то пошло не так 😞. Повторите запрос позже.
      </div>

      <div v-else-if="getDataOneCallComputed" class="all-content">
        <h1 class="text-black font-semibold mb-2 pt-5">
          Прогноз на 7 дней
        </h1>
        <h2 class="text-black mb-4 pt-2">
          {{ locationData?.display_name }}
        </h2>
        <div class="card__wrapper md:(grid grid-cols-2) gap-5">
          <ForecastCard v-for="(day, index) in getDataOneCallComputed?.daily.slice(1)" :key="index" :data="day" :timezone="getDataOneCallComputed?.timezone_offset" />
        </div>
      </div>

      <!-- <pre>
        {{ getDataOneCallComputed?.daily.slice(0, 1) }}
      </pre> -->

    </BaseContainer>
  </section>
</template>

<script setup lang="ts">
// import { HPA_TO_MM_OF_MERCURY } from '~/config/config.js';


// todo получаем инфу по странам
// import { getCountryByCode } from '~/data/data.js';

import { useWeather } from '~/composables/useWeather.js';
import { useDate } from '~/composables/useDate.js';
import { useWind } from '~/composables/useWind.js';

// todo используем composable с получением данных
const { loading, error, locationData,getDataOneCallComputed } = useWeather();
// console.log('data: ', data);
// console.log('getDataOneCallComputed: ', getDataOneCallComputed);

// todo используем composable для получения даты
const { getLocalDate } = useDate(getDataOneCallComputed);
console.log('getLocalDate: ', getLocalDate);

// todo используем composable для получения даты
const { windTextualDescription } = useWind(getDataOneCallComputed);
console.log('windTextualDescription: ', windTextualDescription);

</script>


<style lang="scss" scoped>
  
</style>


<route lang="yaml">
meta:
  layout: default
</route>