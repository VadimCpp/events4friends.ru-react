import React from 'react';
import './MessengerLink.css';

function MessengerLink(
  {
    ExternalLinkComponent,
    messengerName,
    href,
    icon,
  }
  ) {
  return (
    <ExternalLinkComponent
      href={href}
      icon={icon}
      alt={messengerName}
      classList={['messengers__link', `messengers__link--${messengerName}`]}
    />
  );
}

export default MessengerLink;
