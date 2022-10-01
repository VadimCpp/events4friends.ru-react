import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import './RadioButton.css';

const RadioButton = ({ type, onClick, active, children }) => (
  <button
    type="button"
    className={cn('radio-button', `radio-button--${type}`, {
      active,
    })}
    onClick={onClick}
  >
    <span className={cn('radio-button__circle', { active })} />
    <span className="radio-button__label">{children}</span>
  </button>
);

RadioButton.propTypes = {
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node,
  type: PropTypes.oneOf(['service', 'events']),
};

RadioButton.defaultProps = {
  type: 'default',
};

export default RadioButton;
