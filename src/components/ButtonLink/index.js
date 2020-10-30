import React from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import './ButtonLink.css';

const ButtonLink = ({
  to,
  icon,
  alt,
  title,
  style,
  className = '',
  classList = [],
}) => {
  let CName = 'link_image_welcome_list';

  if (icon === '/icons/icon_arrow_back.svg') {
    CName = 'link_image_for_navigation';
  }

  return (
    <Link
      to={to}
      style={style}
      className={cn('link', className, [...classList])}
    >
      <img src={icon} alt={alt || 'le-icon'} className={CName} />
      <span className="link__text"> {title} </span>
    </Link>
  );
};

export default ButtonLink;
