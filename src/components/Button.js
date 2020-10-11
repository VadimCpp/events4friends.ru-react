import React from 'react';
import './Button.css';

function Button({
  tag: Tag = 'button',
  borderColor = '#4d4d4d',
  onPress = () => {},
  icon,
  children,
}) {
  return (
    <Tag
      onClick={onPress}
      className="welcomeview__button"
      style={{ borderColor }}
    >
      <div className="welcomeview__image__wrapper">
        <img src={icon} alt={children} className="welcomeview__image" />
      </div>
      {children && <div className="welcomeview__text">{children}</div>}
    </Tag>
  );
}

export default Button;
