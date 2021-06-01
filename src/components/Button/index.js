import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import './Button.css';

const Button = ({
  tag: Tag = 'button',
  style,
  onPress = () => {},
  icon,
  children,
  classList = [],
  className = '',
}) => {
  return (
    <Tag
      className={cn('welcomeview__button', className, [...classList])}
      onClick={onPress}
      style={style}
    >
      <span className="welcomeview__image__wrapper">
        <img src={icon} alt={children} className="welcomeview__image" />
      </span>
      {children && <span className="welcomeview__text">{children}</span>}
    </Tag>
  );
};

Button.propTypes = {
  onPress: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired,
};

export default Button;
