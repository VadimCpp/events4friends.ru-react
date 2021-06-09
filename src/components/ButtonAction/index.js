import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import './ButtonAction.css';

export const ButtonAction = ({ type, onClick, active, label, children }) => (
  <button
    type="button"
    className={cn('button-action', `button-action--${type}`, {
      active,
    })}
    onClick={onClick}
  >
    <span className={cn('button-action__circle', { active })} />
    <span className="button-action__label">{label || children}</span>
  </button>
);

ButtonAction.propTypes = {
  active: PropTypes.bool.isRequired,
  label: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node,
  type: PropTypes.oneOf(['service', 'events']),
};

ButtonAction.defaultProps = {
  type: 'default',
};
