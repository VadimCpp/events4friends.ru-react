import moment from 'moment';

export const EventsFilterType = {
  Upcoming: 'UPCOMING_EVENTS',
  Past: 'PAST_EVENTS',
  // TODO: add more types here
};

export function isEventHaseStartTime({ start, timezone }) {
  if (!start || !timezone) {
    return false;
  }
  /*
    Если передать невалидную строку в качестве даты (например "NULL"),
    Chrome вернёт объект отрицательное количество миллисекунд,
    Firefox вернёт NaN
 */
  const milliseconds = Date.parse(start + timezone);
  return !Number.isNaN(milliseconds) && milliseconds > 0;
}

export function sortEvents(eventsList, desc = false) {
  return eventsList.sort((a, b) => {
    let startEventA = new Date(a.start).getTime();
    let startEventB = new Date(b.start).getTime();
    if (Number.isNaN(startEventA) || Number.isNaN(startEventB)) {
      return -1;
    }
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

/**
 * Return absolute time 2021-03-23T10:00+0200 => 2021-03-23T08:00:00.000Z
 * @param date
 * @param timezone
 * @return {Date}
 */
export function dateWithTimezon(date, timezone) {
  return moment(`${date}${timezone}`).toDate();
}

/**
 * Returns a list of events according to the passed filter type
 * @param eventsList
 * @param filterType
 * @param {Date} dateNow
 * @return {Events[]}
 */
export function filterEvents(eventsList, filterType, dateNow = new Date()) {
  return eventsList.filter(event => {
    if (!isEventHaseStartTime(event)) {
      return false;
    }
    const eventStart = dateWithTimezon(event.start, event.timezone);
    const eventEnd = dateWithTimezon(event.end, event.timezone);
    switch (filterType) {
      case EventsFilterType.Upcoming:
        return eventStart > dateNow || eventEnd > dateNow;
      case EventsFilterType.Past:
        return eventStart < dateNow;
      default:
        return false;
    }
  });
}

export function isCurrentEvent(start, end, timezone) {
  const startDate = dateWithTimezon(start, timezone);
  const endDate = dateWithTimezon(end, timezone);
  const now = new Date();
  return startDate < now && endDate > now;
}

export function isComingEvent(start, timezone) {
  const HOUR = 3600000;
  const startDate = new Date(`${start}${timezone}`).getTime();
  const timeBefore = startDate - Date.now();
  return timeBefore > 0 && timeBefore < HOUR;
}
