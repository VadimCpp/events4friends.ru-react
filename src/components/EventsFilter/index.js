import React from 'react';
import PropTypes from 'prop-types';
import { ButtonAction } from '../ButtonAction';
import './EventsFilter.css';

const BUTTON_TYPE = 'events';

function EventsFilter({ onFilterTypeChange, filterType, upcoming, past }) {
  return (
    <div className="events-filter">
      <span className="events-filter__label">Фильтр:</span>

      <ButtonAction
        onClick={() => {
          if (filterType !== upcoming) {
            if (onFilterTypeChange) {
              onFilterTypeChange(upcoming);
            }
          }
        }}
        active={filterType === upcoming}
        type={BUTTON_TYPE}
      >
        Предстоящие
      </ButtonAction>

      <ButtonAction
        onClick={() => {
          if (filterType !== past) {
            if (onFilterTypeChange) {
              onFilterTypeChange(past);
            }
          }
        }}
        active={filterType === past}
        type={BUTTON_TYPE}
      >
        Прошедшие
      </ButtonAction>
    </div>
  );
}

EventsFilter.propTypes = {
  onFilterTypeChange: PropTypes.func.isRequired,
  filterType: PropTypes.string.isRequired,
  upcoming: PropTypes.string.isRequired,
  past: PropTypes.string.isRequired,
};

export default EventsFilter;
