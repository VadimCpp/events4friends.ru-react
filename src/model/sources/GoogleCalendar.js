import axios from 'axios';
import Event from "../Event";

class GoogleCalendar {
  /**
   * @param {string} calendarId id календаря
   */
  constructor(calendarId) {
    this.calendarId = calendarId;
    this.events = null;
  }
    
  /**
   * @param {function} cbSuccess функция вызывается при успешном получении данных
   * @param {function} cbError функция вызывается в случае ошибки
   */
  loadEvents = async (cbSuccess, cbError) => {    
    const URL = 'https://www.googleapis.com/calendar/v3/calendars/';
    const API_KEY = 'AIzaSyBOXnnT1F-h9s1FP3063BQ_o0KtD7Y0DPs';

    try {
      const responce = await axios.get(`${URL}${this.calendarId}/events?key=${API_KEY}`);
      const { items } = responce.data;

      let events = [];

      items.forEach((item) => {
        const eventId = item.id;
        const start = item.start.dateTime || item.start.date;
        const end = item.end.dateTime || item.end.date;
        const summary = item.summary;
        const description = item.description;
        const location = item.location;
        const contact = item.creator.email;
        //
        // NOTE!
        // С мобильного устройства сайт гугл календаря выглядит плохо,
        // по-этому ссылка спрятана.
        //
        // const reference = item.htmlLink;
        const reference = null;
  
        const event = new Event(eventId, start, end, summary, description, location, contact, reference);

        events.unshift(event);
      });

      if (events.length) {
        this.events = events;
        cbSuccess(events);
      } else {
        throw "No events has been parsed from Google Calendar.";
      }      
    }
    catch(error) {
      cbError(error);
    }
  }
};

export default GoogleCalendar;
