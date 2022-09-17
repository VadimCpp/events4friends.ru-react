import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import './ButtonExternalLink.css';
import './SocialNetworkLink.css';

const ButtonExternalLink = ({
  href,
  icon,
  alt,
  title,
  style,
  classList,
  className,
}) => {
  return (
    <a
      href={href}
      style={style}
      className={cn('link', className, [...classList])}
    >
      {icon && (
        <img src={icon} alt={alt || 'le-icon'} className="link__image" />
      )}
      {title && <span className="link__text"> {title} </span>}
    </a>
  );
};

ButtonExternalLink.propTypes = {
  href: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  alt: PropTypes.string,
  title: PropTypes.string,
  style: PropTypes.string,
  className: PropTypes.string,
  classList: PropTypes.arrayOf(PropTypes.string),
};

ButtonExternalLink.defaultProps = {
  classList: [],
  className: '',
};

export default ButtonExternalLink;
