import React from 'react';
import AppleStoreBadge from './images/apple_store_badge.png';
import GoogleStoreBadge from './images/google_store_badge.png';

const stores = {
  ios: {
    badge: AppleStoreBadge,
    url:
      'https://apps.apple.com/us/app/events4friends-%D1%81%D0%BE%D0%BE%D0%B1%D1%89%D0%B5%D1%81%D1%82%D0%B2%D0%BE/id1509893426',
  },
  android: {
    badge: GoogleStoreBadge,
    url:
      'https://play.google.com/store/apps/details?id=com.roscomputing.events4friends',
  },
};

const StoreBadge = ({ platform, width }) => {
  return (
    <a href={stores[platform].url}>
      <img
        src={stores[platform].badge}
        alt="Store badge"
        style={{ width: `${width}px` }}
      />
    </a>
  );
};

export default StoreBadge;
