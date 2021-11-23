const getGeocodeQueryByEvent = event => {
  const LINK_REGEXP = /https?:\/\//;
  const KALININGRAD_REGEXP = /^Калининград/;
  const MOSCOW_REGEXP = /^Москва/;

  if (LINK_REGEXP.test(event.location)) {
    return '';
  }

  let fullLocation = '';

  if (event.timezone === '+0200') {
    if (KALININGRAD_REGEXP.test(event.location)) {
      fullLocation = event.location;
    } else {
      fullLocation = `Калининград, ${event.location}`;
    }
  } else if (event.timezone === '+0300') {
    if (MOSCOW_REGEXP.test(event.location)) {
      fullLocation = event.location;
    } else {
      fullLocation = `Москва, ${event.location}`;
    }
  } else {
    fullLocation = event.location;
  }

  return fullLocation;
};

export default getGeocodeQueryByEvent;
