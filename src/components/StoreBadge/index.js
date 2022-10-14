import React from 'react';
import PropTypes from 'prop-types';
import AppleStoreBadge from './images/apple_store_badge.png';
import GoogleStoreBadge from './images/google_store_badge.png';
import { STORE_BADGE_ITEMS } from '../../enums';

const stores = {
  ios: {
    alt: 'Apple Store Badge',
    badge: AppleStoreBadge,
    url:
      'https://apps.apple.com/us/app/events4friends-%D1%81%D0%BE%D0%BE%D0%B1%D1%89%D0%B5%D1%81%D1%82%D0%B2%D0%BE/id1509893426',
  },
  android: {
    alt: 'Play Market Badge',
    badge: GoogleStoreBadge,
    url:
      'https://play.google.com/store/apps/details?id=com.roscomputing.events4friends',
  },
};
const StoreBadge = ({ platform = 'ios', width = 120 }) => {
  if (STORE_BADGE_ITEMS.some(item => item.platform === platform)) {
    return (
      <a href={stores[platform].url}>
        <img
          src={stores[platform].badge}
          alt={stores[platform].alt}
          style={{ width: `${width}px`, height: 'auto' }}
        />
      </a>
    );
  }
  return '';
};

StoreBadge.propTypes = {
  platform: PropTypes.oneOf(['ios', 'android']),
  width: PropTypes.string.isRequired,
};

export default StoreBadge;
