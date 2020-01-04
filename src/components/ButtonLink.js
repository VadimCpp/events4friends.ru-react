import React from 'react'
import { Link } from 'react-router-dom'
import './ButtonLink.css'

function ButtonLink({ to, icon, title, style }) {
  return (
    <Link className="link" to={to} style={style}>
      <img src={icon} alt="le-icon" className="link__image" />
      <span className="link__text"> {title} </span>
    </Link>
  ) 
}

export default ButtonLink;
