export function getLocalSunriseSunset(time, timezone) {
  if (!time || !timezone) return;

  const locale = navigator.language;

  const localTS = (time + timezone) * 1000;

  const date = new Date(localTS);
  // console.log('date: ', date);

  const localOffset = date.getTimezoneOffset() * 60 * 1000;
  // console.log('localOffset: ', localOffset);

  const newTS = localTS + localOffset;

  const newDate = new Date(newTS);

  return Intl.DateTimeFormat(locale, {
    hour: '2-digit',
    minute: '2-digit'
  }).format(newDate);
  // return Date.UTC(localTS);
};