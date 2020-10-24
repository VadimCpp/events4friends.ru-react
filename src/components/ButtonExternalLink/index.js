import React from 'react';
import cn from 'classnames';
import './ButtonExternalLink.css';

const ButtonExternalLink = ({
  href,
  icon,
  alt,
  title,
  style,
  classList = [],
  className = '',
}) => {
  return (
    <a
      href={href}
      style={style}
      className={cn('link', className, [...classList])}
    >
      <img src={icon} alt={alt || 'le-icon'} className="link__image" />
      {title && <span className="link__text"> {title} </span>}
    </a>
  );
};

export default ButtonExternalLink;
