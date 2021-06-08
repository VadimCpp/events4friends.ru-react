import React, { useContext, useCallback } from 'react';
import PropTypes from 'prop-types';

import { DataContext } from '../../context/DataContext';

const CommunityChoice = ({ value, handleChange }) => {
  const { communities } = useContext(DataContext);
  const onChange = useCallback(event => handleChange(event.target.value), [
    handleChange,
  ]);

  return (
    communities.length && (
      <select value={value} onChange={onChange}>
        {communities.map(community => (
          <option key={community.id} value={community.id}>
            {community.name}
          </option>
        ))}
      </select>
    )
  );
};

CommunityChoice.propTypes = {
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default CommunityChoice;
