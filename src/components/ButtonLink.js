import React from 'react'
import { Link } from 'react-router-dom'
import './ButtonLink.css'

function ButtonLink({ to, icon, alt, title, style }) {
  let CName = "link_image_welcome_list";
  if (icon === "/icons/icon_arrow_back.png"){
      CName = "link_image_for_navigation"    
  }
  return (
    <Link className="link" to={to} style={style}>
      <img src={icon} alt={alt || "le-icon"} className={CName} />
      <span className="link__text"> {title} </span>
    </Link>
  ) 
}

export default ButtonLink;
