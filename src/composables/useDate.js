import { ref, computed, watch, readonly } from 'vue';

import { WEATHER_URL, API_KEY, TIME } from '~/config/config.js';

import { useWeatherStore } from '~/stores/weather.js';


export function useDate(getData, timezone = null) {
  console.log('getData: ', getData);
  
  const locale = navigator.language;

  // const timezone = tz ?? getData.value?.timezone; 

  //* computed для получения текущей даты в коротком формате
  const compShortDateTime = computed(() => {
    if (getData.value) {

      //* получаем реальную дату по локальному timestamp
      const realDate = getLocalDate(getData.value?.timezone_offset);
      // const realDate = getLocalDate(timezone);

      const date = Intl.DateTimeFormat(locale, {
        weekday: 'short',
        day: 'numeric',
        month: 'short'
      }).format(realDate);

      const time = Intl.DateTimeFormat(locale, {
        hour: '2-digit',
        minute: '2-digit'
      }).format(realDate);

      return {
        date,
        time 
      }
      // return getData.value.dt;
    }
  });

  // todo функция для получения локальной дату по месту
  const getLocalDate = (timezone, time = null) => {
    // console.log('time: ', time);
    const d = time ? new Date(time) : new Date();
    // console.log('d: ', d);

    //* получаем текущее время где находится пользователь
    const localTime = d.getTime();
    // console.log('localTime: ', localTime);

    //* получаем временную зону в минутах и переводим ее в миллисекунды
    const localOffset = d.getTimezoneOffset() * 60 * 1000;
    // console.log('d.getTimezoneOffset(): ', d.getTimezoneOffset());
    // console.log('localOffset: ', localOffset);

    //* получаем время по гринвичу
    const utc = localTime + localOffset;
    // console.log('utc: ', utc);

    //* получаем локальный timestamp со смещением 
    const localDate = utc + (1000 * timezone);

    //* получаем локальное время в формате даты
    const realDate = new Date(localDate);
    // console.log('realDate: ', realDate);

    return realDate;
  }

  const getLocalSunriseSunset = (time, timezone) => {
    console.log('time: ', time);
    console.log('timezone: ', timezone);

    if (!time || !timezone) return;

    const locale = navigator.language;

    const localTS = (time + timezone) * 1000;

    const date = new Date(localTS);
    // console.log('date: ', date);

    const localOffset = date.getTimezoneOffset() * 60 * 1000;
    // console.log('localOffset: ', localOffset);

    const newTS = localTS + localOffset;

    const newDate = new Date(newTS);

    const formatedDate = Intl.DateTimeFormat(locale, {
      hour: '2-digit',
      minute: '2-digit'
    }).format(newDate);

    console.log('formatedDate: ', formatedDate);
    
    return formatedDate;
    // return Date.UTC(localTS);
  }

  return {
    compShortDateTime,
    getLocalDate,
    getLocalSunriseSunset
  }
}