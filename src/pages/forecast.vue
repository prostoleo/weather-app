<template>
  <section class="bg-primary min-h-screen pb-10">
    <Header :not-home="true" />
    <BaseContainer>
      <h1 class="text-black font-semibold mb-4 pt-5">
        Прогноз на 7 дней
      </h1>
      <ForecastCard />
    </BaseContainer>
  </section>
</template>


<style lang="scss" scoped>
  section {

  }
</style>


<route lang="yaml">
meta:
  layout: default
</route>