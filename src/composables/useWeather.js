import { ref, computed, watch, readonly } from 'vue';

import { WEATHER_URL, API_KEY, TIME } from '~/config/config.js';

import { useWeatherStore } from '~/stores/weather.js';

export function useWeather() {
  //* для основных данных
  const data = ref(null);

  const dataOneCall = ref(null);

  //* для загрузки
  const loading = ref(false);

  let timer = null;

  // todo работа с pinia store
  const store = useWeatherStore();
  console.log('store: ', store);

  // todo получаем основную информацию о погоде
  async function getWeatherData() {
    const dataFromStore = store.getWeatherNow;
    console.log('dataFromStore: ', dataFromStore);

    //* если получили данные из store - записываем данные и выходим из функции
    if (dataFromStore) {
      data.value = dataFromStore; 

      return;
    }

    try {
      timer = setTimeout(() => {
        throw new Error ('Упс, запрос занял слишком много времени');
      }, TIME * 1000)

      loading.value = true;

      /* const requests = [
        fetch(`${WEATHER_URL}?q=Челябинск&units=metric&appid=${API_KEY}&lang=ru`),
        fetch(`${WEATHER_URL}?q=Челябинск&units=metric&appid=${API_KEY}&lang=ru`),
        fetch(`${WEATHER_URL}?q=Челябинск&units=metric&appid=${API_KEY}&lang=ru`),
      ];

      const responses = await Promise.all(requests);
      console.log('responses: ', responses);

      responses.forEach((response) => {
        if (!response.ok) {
          throw new Error(
            `Oops, something went wrong. Try again later (${response.status})`
          );
        }
      }); */

      const request = `${WEATHER_URL}?q=Челябинск&units=metric&appid=${API_KEY}&lang=ru`
      ;

      const response = await fetch(request);
      console.log('response: ', response);

      if (!response.ok) {
        throw new Error('Упс, что-то пошло не так ');
      }

      const result = await response.json();
      console.log('result: ', result);

      data.value = result;

      // todo для oneCall API
      const exclude = 'minutely,alerts';

      const requestOneCall = `https://api.openweathermap.org/data/2.5/onecall?lat=${data.value.coord.lat}&lon=${data.value.coord.lon}&units=metric&&exclude=${exclude}&appid=${API_KEY}&lang=ru`;

      const responseOneCall = await fetch(requestOneCall);
      console.log('responseOneCall: ', responseOneCall);

      if (!responseOneCall.ok) {
        throw new Error('Упс, что-то пошло не так ');
      }

      const resultOneCall = await responseOneCall.json();
      console.log('resultOneCall: ', resultOneCall);

      dataOneCall.value = resultOneCall;

      // return result;
    } catch (error) {
      console.log(`💣💣💣 ${error}`);
    } finally {
      loading.value = false;
    
      clearTimeout(timer);
    }
  };

  //* наблюдаем за функцией для получения основных данных
  watch(getWeatherData, (newVal) => {
    console.log('newVal: ', newVal);
    // data.value = await newVal;
  });

  const getDataComputed = computed(() => data.value);

  const getDataOneCallComputed = computed(() => dataOneCall.value);

  // todo работа с pinia store
  store.addWeatherNow(getDataComputed);

  return {
    data: readonly(data),
    dataOneCall: readonly(dataOneCall),
    loading: readonly(loading),
    getWeatherData,
    getDataComputed,
    getDataOneCallComputed
  }
}