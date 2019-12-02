import React from 'react'
import './Button.css'

function Button({ tag: Tag = "a", icon, children, borderColor = "#4d4d4d", ...props }) {
  return (
    <Tag className="welcomeview__button" {...props} style={{ borderColor }}>
      <div className="welcomeview__image">
        <img src={icon} alt={children} />
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