<template>
  <section>
    <BaseContainer>
      <div class="content">
        <h3 class="date">пт, 1 окт.</h3>
        <h3 class="time">13:57</h3>
        <h2 class="lоcation">Москва, Российская Федерация</h2>
        <h2 class="temperature">+5</h2>

        <h3 class="description">облачно с прояснениями</h3>

        <img src="/icons/clouds.svg" alt="облачно с прояснениями">

        <pre>
          {{data}}
        </pre>


      </div>
    </BaseContainer>
  </section>
</template>

<script setup lang="ts">
  import { WEATHER_URL, API_KEY, TIME } from '~/config/config.js';

  console.log('WEATHER_URL: ', WEATHER_URL);
  console.log('API_KEY: ', API_KEY);
  console.log('TIME: ', TIME);

  const data = ref([]);

  watch(getWeatherData, (newVal) => {
    console.log('newVal: ', newVal);
    // data.value = newVal;
  });

  async function getWeatherData() {
    try {
      const response = await fetch(`${WEATHER_URL}?q=Москва,ru&units=metric&appid=${API_KEY}&lang=ru`);

      const result = await response.json();

      data.value = result;
      // return result;
    } catch (error) {
      console.log(`💣💣💣 ${error}`);
    }
  };

  // const data = await getWeatherData();
</script>

<style lang="scss" scoped>
  
</style>

<route lang="yaml">
meta:
  layout: home
</route>