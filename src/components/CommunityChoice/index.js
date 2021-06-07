import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { DataContext } from '../../context/DataContext';

const CommunityChoice = ({ value, handleChange }) => {
  const { communities } = useContext(DataContext);

  return (
    communities.length && (
      <select
        value={value}
        onChange={event => handleChange(event.target.value)}
      >
        {communities.map(community => {
          return (
            <option key={community.id} value={community.id}>
              {community.name}
            </option>
          );
        })}
      </select>
    )
  );
};

CommunityChoice.propTypes = {
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default CommunityChoice;
