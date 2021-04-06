import moment from 'moment';

// enums
import EventsFilter from '../enums';

/**
 * Возвращает город в зависимости от часового пояса
 *
 * NOTE!
 * Когда появятся несколько городов в обнос часовом поясе, начнется веселуха :)
 *
 * @param {string} timezone часовой пояс в текстовой интерпретации
 * @returns {Date}
 */
export function timeZoneToCityName(timezone) {
  let retVal = '';
  if (timezone === '+0200') {
    retVal = 'Клд';
  } else if (timezone === '+0300') {
    retVal = 'Мск';
  }
  return retVal;
}

/**
 * Возвращает время начала мероприятия
 * @param {Object} event событие
 * @returns {Date}
 */
export const getStartDate = event => {
  let start = null;
  if (event.start && event.timezone) {
    start = moment(`${event.start}${event.timezone}`).toDate();
  }
  return start;
};

/**
 * Возвращает время окончания мероприятия
 * @param {Object} event событие
 * @returns {Date}
 */
export const getEndDate = event => {
  let end = null;
  if (event.end && event.timezone) {
    end = moment(`${event.end}${event.timezone}`).toDate();
  } else if (event.start && event.timezone) {
    //
    // NOTE!
    // Если время окончания не указано, устанавливаем по умолчанию 1 час
    //
    const DEFAULT_DURATION = 1;
    end = moment(`${event.start}${event.timezone}`).toDate();
    end.setTime(end.getTime() + DEFAULT_DURATION * 60 * 60 * 1000);
  }
  return end;
};

/**
 * Функция сравнения мероприятий для формировании списка предстоящих мероприятий.
 * @param {Object} a событие
 * @param {Object} b событие
 * @returns {number}
 */
export const sortAscending = (a, b) => {
  let retVal = 0;
  if (a.start > b.start) {
    retVal = 1;
  } else if (a.start < b.start) {
    retVal = -1;
  }
  return retVal;
};

/**
 * Функция сравнения мероприятий для формировании списка прошедших мероприятий.
 * @param {Object} a событие
 * @param {Object} b событие
 * @returns {number}
 */
export const sortDescending = (a, b) => {
  let retVal = 0;
  if (a.start < b.start) {
    retVal = 1;
  } else if (a.start > b.start) {
    retVal = -1;
  }
  return retVal;
};

/**
 * Функция формировании списка предстоящих мероприятий.
 * @param {Array} events общий список мероприятий
 * @param {Date} now метка времени, которую считать текущим временем
 * @returns {number}
 */
export const sortUpcomingEvents = (events, now) => {
  let sortedEvents = [];
  sortedEvents = events.filter(event => {
    const end = getEndDate(event);
    return end && end > now;
  });

  sortedEvents.sort(sortAscending);
  return sortedEvents;
};

/**
 * Функция формировании списка прошедших мероприятий.
 * @param {Array} events общий список мероприятий
 * @param {Date} now метка времени, которую считать текущим временем
 * @returns {number}
 */
export const sortPastEvents = (events, now) => {
  let sortedEvents = [];
  const currentEvents = events.filter(event => {
    const end = getEndDate(event);
    const start = getStartDate(event);
    return end && end > now && start && start < now;
  });
  currentEvents.sort(sortDescending);

  const pastEvents = events.filter(event => {
    const end = getEndDate(event);
    return end && end < now;
  });
  pastEvents.sort(sortDescending);

  sortedEvents = [...currentEvents, ...pastEvents];
  return sortedEvents;
};

/**
 * Формирование списка прошедших или предстоящих мероприятий.
 * @param {Array} events общий список мероприятий
 * @param {string} filterType тип фильтра
 * @returns {number}
 */
export const getSortedEvents = (events, filterType) => {
  const now = new Date();
  let sortedEvents = [];
  if (filterType === EventsFilter.Upcoming) {
    sortedEvents = sortUpcomingEvents(events, now);
  } else if (filterType === EventsFilter.Past) {
    sortedEvents = sortPastEvents(events, now);
  }
  return sortedEvents;
};

/**
 * Функция проверяет идет ли сейчас мероприятие
 * @param {Object} event событие
 * @returns {boolean}
 */
export const isCurrentEvent = event => {
  const now = new Date();
  const end = getEndDate(event);
  const start = getStartDate(event);
  return end && end > now && start && start < now;
};

/**
 * Функция проверяет начнется ли мероприятие в течение часа
 * @param {Object} event событие
 * @returns {boolean}
 */
export const isStartWithinAnHourEvent = event => {
  const now = new Date();
  const start = getStartDate(event);
  const minusHour = new Date();
  if (start) {
    minusHour.setTime(start.getTime() - 1 * 60 * 60 * 1000); // extract an hour
  }
  return start && start > now && minusHour && minusHour < now;
};

/**
 * Функция возвращает дату в удобном для пользователя формате
 * @param {Object} event событие
 * @returns {string}
 */
export const getVerboseDate = event => {
  return moment(`${event.start}`).format('D MMMM, dddd');
};

/**
 * Функция возвращает время в удобном для пользователя формате
 * @param {Object} event событие
 * @returns {string}
 */
export const getVerboseTime = event => {
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
};
