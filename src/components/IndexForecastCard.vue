<template>
  <div class="card px-4 py-3 bg-white rounded-2xl flex flex-col items-center gap-y-1">
    <span class="day uppercase text-sm">{{ dayOfWeek }}</span>
    <div class="for-icon w-15 inline-flex justify-center items-center">
      <img class="icon" :src="`http://openweathermap.org/img/w/${data.weather[0].icon}.png`">
    </div>
    <span class="temperature font-bold">{{ Math.round(data.temp.day) }}</span>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    data: {
      type: Object,
      default: null,
      required: true
    }
  });

  // console.log('props: ', props);

  const locale = navigator.language;
  // console.log('locale: ', locale);

  const dayOfWeek = Intl.DateTimeFormat(locale, {
    weekday: 'short'
  }).format(props.data.dt * 1000);
</script>

<style lang="scss" scoped>
  
</style>
