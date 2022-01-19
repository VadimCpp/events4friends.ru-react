import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

const Button = ({ onPress, icon, children }) => {
  return (
    <button type="button" className="welcomeview__button" onClick={onPress}>
      <span className="welcomeview__image__wrapper">
        <img
          src={icon}
          alt=""
          aria-hidden="true"
          className="welcomeview__image"
        />
      </span>
      <span className="welcomeview__text">{children}</span>
    </button>
  );
};

Button.propTypes = {
  onPress: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired, // https://stackoverflow.com/a/42122662/1775459
};

export default Button;
