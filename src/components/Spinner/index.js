import React from 'react';
import PropTypes from 'prop-types';
import './Spinner.css';

const Spinner = ({ message }) => {
  return (
    <div>
      <svg className="spinner" viewBox="0 0 50 50">
        <circle
          className="path"
          cx="25"
          cy="25"
          r="20"
          fill="none"
          strokeWidth="4"
        />
      </svg>
      <p className="message">{message}</p>
    </div>
  );
};

Spinner.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Spinner;
