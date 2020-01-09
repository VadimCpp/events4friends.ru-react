class Event {
  /**
   * @param {string} id - уникальный идентификатор
   * @param {string} start - начало, dateTime, например "2019-09-14T11:00:00+02:00"
   * @param {string|null} end	- конец, dateTime
   * @param {string} summary - короткое название мероприятия
   * @param {string|null} description - полное описание
   * @param {string} location - адрес мероприятия
   * @param {string} contact - контакт организатора
   * @param {string|null} reference - ссылка на источник
   */
  constructor(id, start, end, summary, description, location, contact, reference) {    
    this.id = id;
    this.start = start;
    this.end = end;
    this.summary = summary;
    this.description = description;
    this.location = location;
    this.contact = contact;
    this.reference = reference;
  }
}

export default Event;
