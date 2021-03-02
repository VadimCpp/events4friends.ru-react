import moment from 'moment';

export function isEventHaseStartTime(event) {
  return event.start && event.timezone;
}

export function sortEvents(eventsList, desc = false) {
  return eventsList.sort((a, b) => {
    let startEventA = new Date(a.start).getTime();
    let startEventB = new Date(b.start).getTime();
    if (desc) {
      [startEventA, startEventB] = [startEventB, startEventA];
    }
    return startEventA - startEventB;
  });
}

export function setEndTime(event, duration = 1) {
  if (!isEventHaseStartTime(event) || event.end) {
    return event;
  }
  const end = moment(event.start)
    .add(duration, 'h')
    .format('YYYY-MM-DDTHH:mm');
  return {
    ...event,
    end,
  };
}
