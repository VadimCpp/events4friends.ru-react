import React, { Component } from 'react';
import './EventsFilter.css';

const EventsFilterType = {
  Upcoming: 'UPCOMING_EVENTS',
  Past: 'PAST_EVENTS',
  // TODO: add more types here
};

class EventsFilter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filterType: EventsFilterType.Upcoming,
    };
  }

  render() {
    const { filterType } = this.state;

    return (
      <div className="events-filter">
        <span className="events-filter__label">Фильтр:</span>
        <button
          className={
            filterType === EventsFilterType.Upcoming
            ? "events-filter__button events-filter__button--disabled"
            : "events-filter__button"
          }
          onClick={() => {
            this.setState({ filterType: EventsFilterType.Upcoming })
          }}
        >
          Предстоящие
        </button>
        <button
          className={
            filterType === EventsFilterType.Past
            ? "events-filter__button events-filter__button--disabled"
            : "events-filter__button"
          }
          onClick={() => {
            this.setState({ filterType: EventsFilterType.Past })
          }}
        >
          Прошедшие
        </button>
      </div>
    )
  }
};

export default EventsFilter;
