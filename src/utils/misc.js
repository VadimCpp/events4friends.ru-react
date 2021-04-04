export function timeZoneToCityName(timezone) {
  let retVal = '';
  if (timezone === '+0200') {
    retVal = 'Клд';
  } else if (timezone === '+0300') {
    retVal = 'Мск';
  }
  return retVal;
}
