import React, { useContext, useCallback } from 'react';
import PropTypes from 'prop-types';

import { DataContext } from '../../context/DataContext';
import Spinner from '../Spinner';
import { NOTICES } from '../../enums';

const CommunityChoice = ({ value, handleChange }) => {
  const { communities } = useContext(DataContext);
  const onChange = useCallback(event => handleChange(event.target.value), [
    handleChange,
  ]);

  return !communities.length ? (
    <Spinner message={NOTICES.LOADING} />
  ) : (
    communities.length &&
      communities.map(community => (
        <label key={community.id} htmlFor={community.id}>
          <input
            id={community.id}
            type="radio"
            value={community.id}
            checked={community.id === value}
            onChange={onChange}
          />
          <span>{community.name}</span>
        </label>
      ))
  );
};

CommunityChoice.propTypes = {
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default CommunityChoice;
