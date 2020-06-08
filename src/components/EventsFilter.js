import React, { Component } from 'react';
import './EventsFilter.css';

class EventsFilter extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="events-filter">
        <span className="events-filter__label">Фильтр:</span>
        <button className="events-filter__button events-filter__button--disabled">Предстоящие</button>
        <button className="events-filter__button">Прошедшие</button>
      </div>
    )
  }
};

export default EventsFilter;
