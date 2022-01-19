import React from 'react';
import './SocialNetworkLink.css';

function SocialNetworkLink({ ExternalLinkComponent, href, icon, name, title }) {
  return (
    <ExternalLinkComponent
      href={href}
      icon={icon}
      alt={name}
      title={title}
      classList={['social__link', `social__link--${name}`]}
    />
  );
}

export default SocialNetworkLink;
