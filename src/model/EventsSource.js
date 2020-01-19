
import AfishaKaliningrad from './sources/AfishaKalinigrad';
import GoogleCalendar from './sources/GoogleCalendar';

class EventsSource {
  /**
   * @param {string} name название источника
   * @param {string} url ссылка на источник
   */
  constructor(name, url) {    
    this.name = name;
    this.url = url;

    if (this.url === 'https://vk.com/afisha_39') {
      this.source = new AfishaKaliningrad();
    } else if (this.url === 'pravonagorod%40gmail.com') {
      this.source = new GoogleCalendar('pravonagorod%40gmail.com');
    } else if (this.url === 'dveenjcu4k5ktd3k8pv4iul2bk@group.calendar.google.com') {
      this.source = new GoogleCalendar('dveenjcu4k5ktd3k8pv4iul2bk@group.calendar.google.com');
    } else if (this.url === '97oe212v23kfm97rnp7b1fv94c@group.calendar.google.com') {
      this.source = new GoogleCalendar('97oe212v23kfm97rnp7b1fv94c@group.calendar.google.com');
    } else {
      this.source = null;
    }
  }

  /**
   * @param {function} cbSuccess функция вызывается при успешном получении данных
   * @param {function} cbError функция вызывается в случае ошибки
   */
  loadEvents(cbSuccess, cbError) {
    if (this.source) {
      this.source.loadEvents(cbSuccess, cbError);
    } else {
      cbError(`Unknown source: ${this.url}`);
    }
  }

  /**
   * @return {Array<Events>} список событий, который был загружен ранее
   */
  getEvents() {
    let events = [];
    if (this.source && this.source.events) {
      events = this.source.events;
    }
    return events;
  }
}
  
export default EventsSource;
