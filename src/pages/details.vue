<template>
  <section class="bg-primary pb-10">
    <Header :not-home="true" />
    <BaseContainer>
      <!-- <BaseSpinner /> -->
      <!-- <div class="error pt-5 text-center text-white text-lg">
        Упс, что-то пошло не так 😞. Повторите запрос позже.
      </div> -->
      <div class="content text-center pt-5">
        <div class="upper-content text-center text-black pt-6">
          <h3 class="date text-sm opacity-80 uppercase">
            ПН, 4 окт.
          </h3>
          <h3 class="time mt-1 text-sm opacity-80">
            13:57
          </h3>
          <h2 class="lоcation mt-3 ">
            Челябинск, Россия
          </h2>
          <h2 class="temperature mt-4 text-4xl  font-bold">
            + 5
          </h2>

          <h3 class="description mt-2">
            небольшая облачность
          </h3>

          <!-- :src="`http://openweathermap.org/img/w/${getData.weather[0].icon}.png`"  -->
          <img 
            alt="облачно с прояснениями" class="description-img mx-auto mt-3 w-10"
          >

          <div class="main-card mt-5 mb-8 p-6 pb-7 max-w-17rem mx-auto bg-secondary1 rounded-2xl text-black flex flex-col justify-center gap-y-1 drop-shadow-lg">

            <div class="main-card__row flex items-center justify-start gap-x-12">
              <span class="key text-sm font-thin text-black80 block">
                Ощущается как
              </span>
              <span class="value font-semibold text-black block">
                +5
              </span>
            </div>
            <div class="main-card__row flex items-center justify-start gap-x-12">
              <span class="key text-sm font-thin text-black80 block">
                Ощущается как
              </span>
              <span class="value font-semibold text-black block">
                +5
              </span>
            </div>
            <div class="main-card__row flex items-center justify-start gap-x-12">
              <span class="key text-sm font-thin text-black80 block">
                Ощущается как
              </span>
              <span class="value font-semibold text-black block">
                +5
              </span>
            </div>
            <div class="main-card__row flex items-center justify-start gap-x-12">
              <span class="key text-sm font-thin text-black80 block">
                Ощущается как
              </span>
              <span class="value font-semibold text-black block">
                +5
              </span>
            </div>
            <div class="main-card__row flex items-center justify-start gap-x-12">
              <span class="key text-sm font-thin text-black80 block">
                Ощущается как
              </span>
              <span class="value font-semibold text-black block">
                +5
              </span>
            </div>
            <div class="main-card__row flex items-center justify-start gap-x-12">
              <span class="key text-sm font-thin text-black80 block">
                Ощущается как
              </span>
              <span class="value font-semibold text-black block">
                +5
              </span>
            </div>
            <div class="main-card__row flex items-center justify-start gap-x-12">
              <span class="key text-sm font-thin text-black80 block">
                Ощущается как
              </span>
              <span class="value font-semibold text-black block">
                +5
              </span>
            </div>
            <div class="main-card__row flex items-center justify-start gap-x-12">
              <span class="key text-sm font-thin text-black80 block">
                Ощущается как
              </span>
              <span class="value font-semibold text-black block">
                +5
              </span>
            </div>
           

          </div>
          
          <div class="two-cards flex items-center gap-x-2">
            <div class="left flex flex-col  w-12/12">
              <h2 class="inline-flex gap-x-3 justify-start items-center font-bold mb-4">
                Ветер
                <img src="/icons/wind.svg" alt="">
              </h2>

              <div class="card p-2 rounded-2xl bg-secondary1">
                <p class="text-sm text-left">Северо-запад, 5 м/с</p>
                <p class="text-sm text-left mt-1">С порывами, до 7 м/с</p>
              </div>
            </div>
            <div class="right flex flex-col w-12/12">
              <h2 class="inline-flex gap-x-3 justify-start items-center font-bold mb-4">
                Осадки
                <img src="/icons/rain.svg" alt="">
              </h2>

              <div class="card p-2 rounded-2xl bg-secondary1">
                <p class="text-sm text-left">В течение 1 ч. - 15%</p>
                <p class="text-sm text-left mt-1">В течение 3 ч. - 25%</p>
              </div>
            </div>


          </div>
        </div>

        <div class="down-part mt-6">
          <h2 class="title font-bold text-left mb-5 text-black">
            В течение дня
          </h2>

          <div class="down-part__wrapper">
            <DuringDay />

            
          </div>
        </div>

      
      </div>
      
    </BaseContainer>
  </section>
</template>

<script setup lang="ts">
import DuringDay from '~/components/DuringDay.vue';

</script>

<style lang="scss" scoped>
  
</style>

<route lang="yaml">
meta:
  layout: default
</route>
