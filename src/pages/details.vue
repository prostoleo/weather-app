<template>
  <section class="pb-8 bg-primary ">
    <BaseContainer>
      <!-- <BaseSpinner /> -->
      <!-- <div class="error pt-5 text-center text-white text-lg">
        Упс, что-то пошло не так 😞. Повторите запрос позже.
      </div> -->
      <div  class="content">
        <div class="upper-content text-center text-white pt-6">
          <h3 class="date text-sm opacity-80 uppercase">
            ПН, 4 окт.
          </h3>
          <h3 class="time mt-1  text-sm opacity-80">
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

          <div class="main-card mt-5 p-6 pb-7 w-max mx-auto bg-white rounded-3xl text-black flex justify-center gap-x-3">



          </div>
          
          <div class="two-cards">
            <div class="left">
              <h2>
                Ветер
                <img src="/icons/wind.svg" alt="">
              </h2>

              <div class="card">
                <p>Северо-запад, 5 м/с</p>
                <p>С порывами, до 7 м/с</p>
              </div>
            </div>
            <div class="right">
              <h2>
                Осадки
                <img src="/icons/rain.svg" alt="">
              </h2>

              <div class="card">
                <p>В течение 1 ч. - 15%</p>
                <p>В течение 3 ч. - 25%</p>
              </div>
            </div>


          </div>
        </div>

      
      </div>
      
    </BaseContainer>
  </section>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
  
</style>

<route lang="yaml">
meta:
  layout: home
</route>
