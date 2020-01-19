
import AfishaKaliningrad from './sources/AfishaKalinigrad';

class EventsSource {
  /**
   * @param {string} name название источника
   * @param {string} url ссылка на источник
   */
  constructor(name, url) {    
    this.name = name;
    this.url = url;

    if (this.url == 'https://vk.com/afisha_39') {
      this.source = new AfishaKaliningrad();
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
