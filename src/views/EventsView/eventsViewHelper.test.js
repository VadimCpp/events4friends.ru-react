const {
  isEventHaseStartTime,
  sortEvents,
} = require('./helper');

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
