import React, { Component } from 'react';
import './EventsFilter.css';

class EventsFilter extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { onFilterTypeChange, filterType, upcoming, past } = this.props;

    return (
      <div className="events-filter">
        <span className="events-filter__label">Фильтр:</span>
        <button
          className={
            filterType === upcoming
            ? "events-filter__button events-filter__button--disabled"
            : "events-filter__button"
          }
          onClick={() => {
            if (filterType !== upcoming) {
              this.setState({ filterType: upcoming });
              if (onFilterTypeChange) {
                onFilterTypeChange(upcoming);
              }
            }
          }}
        >
          Предстоящие
        </button>
        <button
          className={
            filterType === past
            ? "events-filter__button events-filter__button--disabled"
            : "events-filter__button"
          }
          onClick={() => {
            if (filterType !== past) {
              this.setState({ filterType: past });
              if (onFilterTypeChange) {
                onFilterTypeChange(past);
              }
            }
          }}
        >
          Прошедшие
        </button>
      </div>
    )
  }
};

export default EventsFilter;
