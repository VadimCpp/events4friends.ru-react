import React from 'react'
import './Button.css'

function Button({
  tag: Tag = "button",
  borderColor = "#4d4d4d",
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
      <div className="welcomeview__image">
        <img src={icon} alt={children} width="40" height="40" />
      </div>
      {children &&
        <div className="welcomeview__text">
          {children}
        </div>
      }
    </Tag>
  ) 
}

export default Button