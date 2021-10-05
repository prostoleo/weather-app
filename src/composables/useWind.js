export function useWind(getDataComputed) {
  //* для направления ветра
  const windDirection = computed(() => {
    return windTextualDescription(getDataComputed?.wind?.deg)
  });

  // todo функция для направления ветра
  function windTextualDescription(degree) {
    if (degree > 337.5) return 'сев.';
    if (degree > 292.5) return 'с-з';
    if (degree > 247.5) return 'зап.';
    if (degree > 202.5) return 'ю-з';
    if (degree > 157.5) return 'юж.';
    if (degree > 122.5) return 'ю-в';
    if (degree > 67.5) return 'вос.';
    if (degree > 22.5) return 'с-в';
    return 'cев.';
  }

  return {
    windDirection,
    windTextualDescription
  }
}