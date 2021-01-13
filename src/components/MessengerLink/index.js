import React from 'react';
import './MessengerLink.css';

function MessengerLink(
  {
    ExternalLinkComponent,
    messengerName,
    href = '',
    icon = '',
    ...props
  }
  ) {
  const defaultMessenger = {
    telegram: {
      href: 'tg://resolve?domain=events4friends',
      icon: '/icons/telegram.svg'
    },
    whatsapp: {
      href: 'https://chat.whatsapp.com/DWUaZ1bsuxwJLALyvBYTt8',
      icon: '/icons/whatsapp.svg',
    },
    viber: {
      href: 'https://invite.viber.com/?g2=AQBA7jF9Y7%2BXBkqTI0PoYF%2BmnEMluxPdGZy8wJQ3PRPBLT%2BMeh344RxBuBUTVc6B',
      icon: '/icons/viber.svg',
    },
  };

  const currentHref = href ? href : defaultMessenger[messengerName].href;
  const currentIcon = icon ? icon : defaultMessenger[messengerName].icon;

  return (
    <ExternalLinkComponent
      href={currentHref}
      icon={currentIcon}
      alt={messengerName}
      classList={['messengers__link', `messengers__link--${messengerName}`]}
      {...props}
    />
  );
}

export default MessengerLink;
