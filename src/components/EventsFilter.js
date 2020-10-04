import React from 'react';
import './EventsFilter.css';

function EventsFilter(props) {
  const { onFilterTypeChange, filterType, upcoming, past } = props;

  return (
    <div className="events-filter">
      <span className="events-filter__label">Фильтр:</span>
      <button
        type="button"
        className={
          filterType === upcoming
            ? 'events-filter__button events-filter__button--disabled'
            : 'events-filter__button'
        }
        onClick={() => {
          if (filterType !== upcoming) {
            if (onFilterTypeChange) {
              onFilterTypeChange(upcoming);
            }
          }
        }}
      >
        Предстоящие
      </button>
      <button
        type="button"
        className={
          filterType === past
            ? 'events-filter__button events-filter__button--disabled'
            : 'events-filter__button'
        }
        onClick={() => {
          if (filterType !== past) {
            if (onFilterTypeChange) {
              onFilterTypeChange(past);
            }
          }
        }}
      >
        Прошедшие
      </button>
    </div>
  );
}

export default EventsFilter;
