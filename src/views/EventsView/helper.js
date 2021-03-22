import moment from 'moment';

export const EventsFilterType = {
  Upcoming: 'UPCOMING_EVENTS',
  Past: 'PAST_EVENTS',
  // TODO: add more types here
};

export function isEventHaseStartTime({ start, timezone }) {
  return !!start && !!timezone;
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

export function dateWithTimezon(date, timezone) {
  return moment(`${date}${timezone}`).toDate();
}

export function filterEvents(eventsList, filterType) {
  const now = new Date();
  return eventsList.filter(event => {
    if (!isEventHaseStartTime(event)) {
      return false;
    }
    const eventStart = dateWithTimezon(event.start, event.timezone);
    const eventEnd = dateWithTimezon(event.end, event.timezone);
    switch (filterType) {
      case EventsFilterType.Upcoming:
        return eventStart > now || eventEnd > now;
      case EventsFilterType.Past:
        return eventStart < now;
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
