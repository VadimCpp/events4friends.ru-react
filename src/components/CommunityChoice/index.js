import React, { useContext, useCallback } from 'react';
import PropTypes from 'prop-types';

import { DataContext } from '../../context/DataContext';

const CommunityChoice = ({ value, handleChange }) => {
  const { communities } = useContext(DataContext);
  const onChange = useCallback(event => handleChange(event.target.value), [
    handleChange,
  ]);

  return (
    communities.length &&
    communities.map(community => (
      <label key={community.id} htmlFor={community.id}>
        <span className="text-left">{community.name}</span>
        <input
          className="textinput__input"
          type="radio"
          value={community.id}
          checked={community.id === value}
          onChange={onChange}
        />
      </label>
    ))
  );
};

CommunityChoice.propTypes = {
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default CommunityChoice;
