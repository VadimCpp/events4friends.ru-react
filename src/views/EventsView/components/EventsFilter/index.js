import React from 'react';
import PropTypes from 'prop-types';
import RadioButton from '../../../../components/RadioButton';
import './EventsFilter.css';

const BUTTON_TYPE = 'events';

function EventsFilter({ onFilterTypeChange, filterType, upcoming, past }) {
  return (
    <div className="events-filter">
      <span className="events-filter__label">Фильтр:</span>

      <RadioButton
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
        Будет
      </RadioButton>

      <RadioButton
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
        Было
      </RadioButton>
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
