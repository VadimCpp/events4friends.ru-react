import React from 'react';
import ButtonExternalLink from '../ButtonExternalLink';
import './CommunityList.css';

const CommunityList = ({ communities }) => {
  const communityItem = item => (
    <li className="community-list__item ">
      <ButtonExternalLink
        href={item.link}
        icon={`/icons/${item.messenger}.svg`}
        alt={item.messenger}
        title={item.title}
        className="cv__button-external-link"
      />
    </li>
  );
  return (
    <ul className="community-list container container-center mt-2">
      {communities.map(communityItem)}
    </ul>
  );
};

export default CommunityList;
