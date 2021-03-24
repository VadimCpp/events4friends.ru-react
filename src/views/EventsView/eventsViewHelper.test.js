const {
  isEventHaseStartTime,
  sortEvents,
  setEndTime,
  dateWithTimezon,
  filterEvents,
  isCurrentEvent,
  isComingEvent,
  EventsFilterType,
} = require('./helper');

const KLD = '+0200';
const MSK = '+0300';

function getNowMs(dateString, timezone) {
  return new Date(dateString + timezone).getTime();
}

describe('isEventHaseStartTime function receive an event as argument and', () => {
  let event;

  beforeEach(() => {
    event = { start: '2021-03-23T14:00', timezone: '+0200' };
  });

  test('should return true if event has start and timezone', () => {
    expect(isEventHaseStartTime(event)).toEqual(true);
  });
  test('should return false if event has not start', () => {
    event.start = '';
    expect(isEventHaseStartTime(event)).toEqual(false);
  });
  test('should return false if event start is incorrect', () => {
    event.start = 'NULL';
    expect(isEventHaseStartTime(event)).toEqual(false);
  });
  test('should return false if event has not timezone', () => {
    event.timezone = '';
    expect(isEventHaseStartTime(event)).toEqual(false);
  });
  test('should return false if has not start and timezone', () => {
    event.start = undefined;
    event.timezone = undefined;
    expect(isEventHaseStartTime(event)).toEqual(false);
  })
});

describe('sortEvents function receive list events and', () => {
  let eventsList;
  let ascendingList;
  let descendingList;

  beforeEach(() => {
    eventsList = [
      { start: '2021-03-23T13:00' },
      { start: '2021-03-23T14:00' },
      { start: '2021-03-24T14:00' },
      { start: '2021-03-15T14:00' },
      { start: '2021-03-23T00:00' },
    ];
    ascendingList = [
      { start: '2021-03-15T14:00' },
      { start: '2021-03-23T00:00' },
      { start: '2021-03-23T13:00' },
      { start: '2021-03-23T14:00' },
      { start: '2021-03-24T14:00' },
    ];
    descendingList = [
      { start: '2021-03-24T14:00' },
      { start: '2021-03-23T14:00' },
      { start: '2021-03-23T13:00' },
      { start: '2021-03-23T00:00' },
      { start: '2021-03-15T14:00' },
    ];
  });

  test('should return an ascending list events', () => {
    expect(sortEvents(eventsList)).toEqual(ascendingList);
  });

  test('should return an descending list events', () => {
    expect(sortEvents(eventsList, true)).toEqual(descendingList);
  });

  test('should return empty list if list events empty to', () => {
    eventsList = [];
    expect(sortEvents(eventsList)).toEqual([]);
  });

  test('events with an incorrect start time are expected at the end of the ascending list ',
    () => {
      ascendingList.push({ start: 'NULL' });
      eventsList.unshift({ start: 'NULL' })
      expect(sortEvents(eventsList)).toEqual(ascendingList);
  });

  test('events with an incorrect start time are expected at the end of the descending list ',
    () => {
      descendingList.push({ start: 'NULL' });
      eventsList.unshift({ start: 'NULL' })
      expect(sortEvents(eventsList, true)).toEqual(descendingList);
  });
});

describe('setEndTime function check event end time and', () => {
  let event;
  let eventWithDefaultEnd;

  beforeEach(() => {
    event = {
      start: '2021-03-23T10:00',
      end: '2021-03-23T13:00',
      timezone: '+0200',
    };
    eventWithDefaultEnd = {
      start: '2021-03-23T10:00',
      end: '2021-03-23T11:00',
      timezone: '+0200',
    };
  });

  test('return event if event has end time', () => {
    expect(setEndTime(event)).toEqual(event);
  });

  test('set end time with default duration', () => {
    event.end = null;
    expect(setEndTime(event)).toEqual(eventWithDefaultEnd)
  });

  test('set end time with n duration', () => {
    const eventDuration = 3;
    let [endDate, endTime] = event.start.split('T');
    endTime = endTime.split(':');
    endTime[0] = Number(endTime[0]) + eventDuration;

    const eventWithDurationEnd = {
      ...eventWithDefaultEnd,
      end: `${endDate}T${endTime.join(':')}`,
    }
    event.end = null;
    expect(setEndTime(event, eventDuration)).toEqual(eventWithDurationEnd)
  });
});

describe('dateWithTimezone function receive date (YYYY-MM-DDTHH:mm) and timezone and', () => {
  const date = '2021-03-23T10:00';
  const timezone = '+0200';
  test('should return date with timezone', () => {
    expect(dateWithTimezon(date, timezone)).toEqual(new Date('2021-03-23T08:00:00.000Z'));
  });
});

describe('filterEvents receive list events, filter type and', () => {
  const now = '2021-03-25T12:00';
  const upcomingEvents = [
    { start: '2021-03-25T13:00', timezone: '+0200' },
    { start: '2021-03-26T13:00', timezone: '+0200' },
    { start: '2021-03-25T19:00', timezone: '+0200' },
    { start: '2021-03-26T13:00', timezone: '+0200' },
    { start: '2021-03-27T00:00', timezone: '+0200' },
  ];
  const pastEvents = [
    { start: '2021-03-23T13:00', timezone: '+0200' },
    { start: '2021-03-23T14:00', timezone: '+0200' },
    { start: '2021-03-24T14:00', timezone: '+0200' },
    { start: '2021-03-15T14:00', timezone: '+0200' },
    { start: '2021-03-23T00:00', timezone: '+0200' },
  ];
  let eventsList;

  beforeEach(() => {
    eventsList = [
      { start: '2021-03-23T13:00', timezone: '+0200' },
      { start: '2021-03-25T13:00', timezone: '+0200' },
      { start: '2021-03-23T14:00', timezone: '+0200' },
      { start: '2021-03-26T13:00', timezone: '+0200' },
      { start: '2021-03-24T14:00', timezone: '+0200' },
      { start: '2021-03-25T19:00', timezone: '+0200' },
      { start: 'NULL', timezone: '+0200' },
      { start: '2021-03-15T14:00', timezone: '+0200' },
      { start: '2021-03-26T13:00', timezone: '+0200' },
      { start: '2021-03-26T13:00', timezone: 'NULL' },
      { start: '2021-03-23T00:00', timezone: '+0200' },
      { start: '2021-03-27T00:00', timezone: '+0200' },
    ];
  });

  test('should return upcoming events', () => {
    expect(filterEvents(eventsList, EventsFilterType.Upcoming, new Date(now))).toEqual(upcomingEvents);
  });

  test('should return past events', () => {
    expect(filterEvents(eventsList, EventsFilterType.Past, new Date(now))).toEqual(pastEvents);
  });
});

describe('isCurrentEvent returns whether the event is currently running', () => {
  let start, end, timezone, dateNow;

  beforeEach(() => {
    start = '2021-03-23T13:00';
    end = '2021-03-23T14:00';
    timezone = KLD;
    dateNow = '2021-03-23T13:30'
  });

  test('should return true, if timezones are equal', () => {
    expect(isCurrentEvent(start, end, timezone, new Date(dateNow + KLD))).toBe(true);
    timezone = MSK;
    expect(isCurrentEvent(start, end, timezone, new Date(dateNow + MSK))).toBe(true);
  });

  test('should return false, if timezones are different', () => {
    // начало в 13 (14 по Москве), текущее Московское время 13:30
    expect(isCurrentEvent(start, end, timezone, new Date(dateNow + MSK))).toBe(false);
    timezone = MSK;
    // начало в 13 (по Москве), текущее Калининградское время 13:30 (мероприятие закончилось)
    expect(isCurrentEvent(start, end, timezone, new Date(dateNow + KLD))).toBe(false);
  });

  test('should return true, if timezones are different and the duration of the event is more than an hour ', () => {
    start = '2021-03-23T12:00';
    end = '2021-03-23T15:00';
    expect(isCurrentEvent(start, end, timezone, new Date(dateNow + MSK))).toBe(true);
    timezone = MSK;
    expect(isCurrentEvent(start, end, timezone, new Date(dateNow + KLD))).toBe(true);
  });
});

describe('isComingEvent if the event starts soon', () => {
  let start, timezone, notifyAdvance, now;

  beforeEach(() => {
    start = '2021-03-23T12:00';
    timezone = KLD;
    notifyAdvance = 1;
    now = '2021-03-23T11:30';
  });

  test('should return true if timezone are equal', () => {
    const nowMs = getNowMs(now, KLD);
    expect(isComingEvent(start, timezone, notifyAdvance, nowMs)).toBe(true);
  });

  test('should return false if timezone ar different', () => {
    const nowMs = getNowMs(now, MSK);
    expect(isComingEvent(start, timezone, notifyAdvance, nowMs)).toBe(false);
  });

  test('should return true if timezone ar different', () => {
    now = '2021-03-23T12:30';
    const nowMs = getNowMs(now, MSK);

    expect(isComingEvent(start, timezone, notifyAdvance, nowMs)).toBe(true);
  });

  test('notify n hours in advance', () => {
    notifyAdvance = 2;
    now = '2021-03-23T10:30';
    expect(isComingEvent(start, timezone, notifyAdvance, getNowMs(now, KLD))).toBe(true);
    notifyAdvance = 3;
    now = now = '2021-03-23T09:30';
    expect(isComingEvent(start, timezone, notifyAdvance, getNowMs(now, KLD))).toBe(true);
  });
});
