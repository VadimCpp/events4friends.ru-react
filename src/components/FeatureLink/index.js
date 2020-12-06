import React from 'react';
import './FeatureLink.css';

function FeatureLink(
  {
    LinkComponent,
    to,
    icon,
    title,
  }
) {
  return (
    <LinkComponent
      to={to}
      icon={icon}
      title={title}
      classList={['features__link']}
    />
  );
}

export default FeatureLink;
