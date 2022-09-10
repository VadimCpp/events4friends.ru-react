import React from 'react';
import PropTypes from 'prop-types';
import './Spinner.css';

// реализация спиннера https://codepen.io/supah/pen/BjYLdW

const Spinner = ({ message }) => {
  return (
    <div className="spinner">
      <svg className="spinner__svg" viewBox="0 0 50 50">
        <circle
          className="spinner__circle"
          cx="25"
          cy="25"
          r="20"
          fill="none"
          strokeWidth="4"
        />
      </svg>
      <p className="spinner__message">{message}</p>
    </div>
  );
};

Spinner.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Spinner;
