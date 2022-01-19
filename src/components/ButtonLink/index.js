import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import './ButtonLink.css';

const ButtonLink = ({ to, icon, alt, title, style, className, classList }) => {
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
      <img src={icon} alt={alt} className={CName} />
      <span className="link__text"> {title} </span>
    </Link>
  );
};

ButtonLink.propTypes = {
  to: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  alt: PropTypes.string,
  style: PropTypes.string,
  className: PropTypes.string,
  classList: PropTypes.arrayOf(PropTypes.string),
};

ButtonLink.defaultProps = {
  classList: [],
  className: '',
  alt: 'le-icon',
};

export default ButtonLink;
