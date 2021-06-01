import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

const Button = ({ onPress, icon, children }) => {
  return (
    <button type="button" className="welcomeview__button" onClick={onPress}>
      <span className="welcomeview__image__wrapper">
        <img src={icon} alt={children} className="welcomeview__image" />
      </span>
      {children && <span className="welcomeview__text">{children}</span>}
    </button>
  );
};

Button.propTypes = {
  onPress: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired,
};

export default Button;
