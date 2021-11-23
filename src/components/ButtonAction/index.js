import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import './ButtonAction.css';

export const ButtonAction = ({ type, onClick, active, children }) => (
  <button
    type="button"
    className={cn('button-action', `button-action--${type}`, {
      active,
    })}
    onClick={onClick}
  >
    <span className={cn('button-action__circle', { active })} />
    <span className="button-action__label">{children}</span>
  </button>
);

ButtonAction.propTypes = {
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node,
  type: PropTypes.oneOf(['service', 'events']),
};

ButtonAction.defaultProps = {
  type: 'default',
};
