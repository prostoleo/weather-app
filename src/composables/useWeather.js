import { ref, computed, watch, watchEffect, readonly, reactive } from 'vue';

import { WEATHER_URL, API_KEY, TIME, API_KEY_CODING, API_KEY_REVERSE_CODING, CODING_URL, CODING_REVERSE_URL } from '~/config/config.js';

import { useWeatherStore } from '~/stores/weather.js';

export function useWeather() {
  //* для основных данных
  const data = ref(null);

  //* для всех данных сразу
  const dataOneCall = ref(null);

  //* для загрузки
  const loading = ref(false);

  //* для координат
  const coords = reactive({
    lat: null,
    lon: null,
  });

  const gotGeoData = ref(false);

  const locationData = reactive({
    display_name: '',
    icon: '',
  });

  const error = reactive({
    status: false,
    message: 'Упс, что-то пошло не так'
  });

  // todo работа с pinia store
  const store = useWeatherStore();
  console.log('store: ', store);
  
  let timer = null;

  // todo получаем основную информацию о погоде
  async function getWeatherData(coords = null) {
    const dataFromStore = store.getWeatherNow;
    console.log('dataFromStore: ', dataFromStore);

    //* если получили данные из store - записываем данные и выходим из функции
    if (dataFromStore) {
      data.value = dataFromStore; 

      return;
    }

    try {
      loading.value = true;
      const geoData = window.navigator.geolocation.getCurrentPosition(
        async (dataGeo) => {
          console.log('dataGeo: ', dataGeo);
          coords.lat = dataGeo.coords.latitude;
          coords.lon = dataGeo.coords.longitude;
    
          console.log('coords: ', coords);
          
          gotGeoData.value = true;
          store.addCoords(coords);
    
          loading.value = true;
          await getReverseGeocoding(coords);
          await getOneCallData(coords);
          loading.value = false;
        },
        async () => {
          console.log('не удалось получить данные о местоположении');
          
          loading.value = true;
          // await getGeocoding();
          // await getOneCallData();
          loading.value = false;
        }
      );

      timer = setTimeout(() => {
        error.status = true;
        throw new Error ('Упс, запрос занял слишком много времени');
      }, TIME * 1000);

      

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

      async function getGeocoding(query = null) {
        console.log('locationData: ', locationData);
        if (!query && !locationData.display_name) {
          throw new Error('не удалось получить данные');
        }
        // const request = `${WEATHER_URL}?q=Челябинск&units=metric&appid=${API_KEY}&lang=ru`;
        const request = `${CODING_URL}?key=${API_KEY_CODING}&q=${locationData.display_name.split(',')[0]}&format=json`

        const response = await fetch(request, {
          headers: {
            'Accept-Language': 'ru'
          }
        });
        console.log('response: ', response);

        if (!response.ok) {
          throw new Error('Упс, что-то пошло не так ');
        }

        const result = await response.json();
        console.log('result: ', result);

        // data.value = result;
        //* сохраняем необходимые данные

        coords.lat = result[0].lat;
        coords.lon = result[0].lon;
        locationData.display_name = result[0].display_name;
        locationData.icon = result[0].icon;

      }

      async function getReverseGeocoding(coords) {
        console.log('coords - reverseGeoCoding: ', coords);

        if (!coords) {
          throw new Error(' не удалось получить координаты  ');
        }
        // const request = `${WEATHER_URL}?q=Челябинск&units=metric&appid=${API_KEY}&lang=ru`;
        const request = `${CODING_REVERSE_URL}?key=${API_KEY_REVERSE_CODING}&lat=${coords.lat}&lon=${coords.lon}&format=json`

        const response = await fetch(request, {
          headers: {
            'Accept-Language': 'ru'
          }
        });
        console.log('response: ', response);

        if (!response.ok) {
          throw new Error('Упс, что-то пошло не так ');
        }

        const result = await response.json();
        console.log('result: ', result);

        // data.value = result;
        //* сохраняем необходимые данные
        locationData.display_name = result.display_name;
        locationData.icon = result?.icon;
      }

      // todo для oneCall API
      async function getOneCallData(cds) {
        console.log('coords in getOneCallData(): ', coords);

        const exclude = 'minutely,alerts';

        const coordsToApi = cds ?? {
          lat: coords?.lat, 
          lon: coords?.lon, 
        }

        const requestOneCall = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordsToApi.lat}&lon=${coordsToApi.lon}&units=metric&&exclude=${exclude}&appid=${API_KEY}&lang=ru`;

        const responseOneCall = await fetch(requestOneCall);
        console.log('responseOneCall: ', responseOneCall);

        if (!responseOneCall.ok) {
          throw new Error('Упс, что-то пошло не так ');
        }

        const resultOneCall = await responseOneCall.json();
        console.log('resultOneCall: ', resultOneCall);

        dataOneCall.value = resultOneCall;

        // return result;
      }
    } catch (error) {
      console.error(`💣💣💣 ${error}`);
    } finally {
      loading.value = false;
    
      clearTimeout(timer);
    }
  };

  //* наблюдаем за функцией для получения основных данных
  /* watch(getWeatherData, (newVal) => {
    console.log('newVal: ', newVal);
    // data.value = await newVal;
  }); */

  watchEffect(getWeatherData, () => {
      console.log(' watch effect ');
    },
    {
      immediate: true
    }
  );

  // const getDataComputed = computed(() => data.value);

  const getDataOneCallComputed = computed(() => dataOneCall.value);

  // todo работа с pinia store
  store.addWeatherNow(getDataOneCallComputed);

  return {
    // data: readonly(data),
    dataOneCall: readonly(dataOneCall),
    loading: readonly(loading),
    gotGeoData: readonly(gotGeoData),
    locationData: readonly(locationData),
    error,
    coords,
    getWeatherData,
    // getDataComputed,
    getDataOneCallComputed
  }
}