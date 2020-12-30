const getFullLocationStrByEvent = event => {
  let fullLocation = '';

  if (event.timezone === '+0200') {
    fullLocation = `Калининград ${event.location}`;
  } else if (event.timezone === '+0300') {
    fullLocation = `Москва ${event.location}`;
  } else {
    fullLocation = event.location;
  }

  return fullLocation;
};

export default getFullLocationStrByEvent;
