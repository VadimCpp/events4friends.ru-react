import { useCallback } from 'react';
import moment from 'moment';

// enums
import EventsFilter from '../enums';

// utils
import { timeZoneToCityName } from '../utils/misc';

const useEventsLogic = () => {
  const getStartDate = useCallback(event => {
    let start = null;
    if (event.start && event.timezone) {
      start = moment(`${event.start}${event.timezone}`).toDate();
    }
    return start;
  }, []);

  const getEndDate = useCallback(event => {
    let end = null;
    if (event.end && event.timezone) {
      end = moment(`${event.end}${event.timezone}`).toDate();
    } else if (event.start && event.timezone) {
      //
      // NOTE!
      // if no end time set, use start time + 1 hour
      //
      end = moment(`${event.start}${event.timezone}`).toDate(); // convert to js Date object
      end.setTime(end.getTime() + 1 * 60 * 60 * 1000); // add an hour
    }
    return end;
  }, []);

  const sortAscending = useCallback((a, b) => {
    let retVal = 0;
    if (a.start > b.start) {
      retVal = 1;
    } else if (a.start < b.start) {
      retVal = -1;
    }
    return retVal;
  }, []);

  const sortDescending = useCallback((a, b) => {
    let retVal = 0;
    if (a.start < b.start) {
      retVal = 1;
    } else if (a.start > b.start) {
      retVal = -1;
    }
    return retVal;
  }, []);

  const sortUpcomingEvents = useCallback(
    (evnts, now) => {
      let sortedEvents = [];
      sortedEvents = evnts.filter(event => {
        const end = getEndDate(event);
        return end && end > now;
      });

      sortedEvents.sort(sortAscending);
      return sortedEvents;
    },
    [getEndDate, sortAscending],
  );

  const sortPastEvents = useCallback(
    (evnts, now) => {
      let sortedEvents = [];
      const currentEvents = evnts.filter(event => {
        const end = getEndDate(event);
        const start = getStartDate(event);
        return end && end > now && start && start < now;
      });
      currentEvents.sort(sortDescending);

      const pastEvents = evnts.filter(event => {
        const end = getEndDate(event);
        return end && end < now;
      });
      pastEvents.sort(sortDescending);

      sortedEvents = [...currentEvents, ...pastEvents];
      return sortedEvents;
    },
    [getEndDate, getStartDate, sortDescending],
  );

  const getSortedEvents = useCallback(
    (events, filterType) => {
      const now = new Date();
      let sortedEvents = [];
      if (filterType === EventsFilter.Upcoming) {
        sortedEvents = sortUpcomingEvents(events, now);
      } else if (filterType === EventsFilter.Past) {
        sortedEvents = sortPastEvents(events, now);
      }
      return sortedEvents;
    },
    [sortUpcomingEvents, sortPastEvents],
  );

  const isCurrentEvent = useCallback(
    event => {
      const now = new Date();
      const end = getEndDate(event);
      const start = getStartDate(event);
      return end && end > now && start && start < now;
    },
    [getEndDate, getStartDate],
  );

  const isStartWithinAnHourEvent = useCallback(
    event => {
      const now = new Date();
      const start = getStartDate(event);
      const minusHour = new Date();
      if (start) {
        minusHour.setTime(start.getTime() - 1 * 60 * 60 * 1000); // extract an hour
      }
      return start && start > now && minusHour && minusHour < now;
    },
    [getStartDate],
  );

  const getVerboseDate = useCallback(event => {
    return moment(`${event.start}`).format('D MMMM, dddd');
  }, []);

  const getVerboseTime = useCallback(event => {
    const withTimezone = moment(`${event.start}${event.timezone}`)
      .toDate()
      .getTime();
    const noTimezone = moment(`${event.start}`)
      .toDate()
      .getTime();

    let verbose = `${moment(event.start).format('HH:mm')} ${timeZoneToCityName(
      event.timezone,
    )}`;
    if (withTimezone !== noTimezone) {
      const localTime = `${moment(`${event.start}${event.timezone}`).format(
        'HH:mm',
      )}`;
      verbose += ` (${localTime} по вашему времени)`;
    }

    return verbose;
  }, []);

  return {
    getSortedEvents,
    isCurrentEvent,
    isStartWithinAnHourEvent,
    getVerboseDate,
    getVerboseTime,
  };
};

export default useEventsLogic;
