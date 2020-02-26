import React from 'react'
import { Link } from 'react-router-dom'
import './ButtonLink.css'

function ButtonLink({ to, icon, title, style }) {
  var CName = "link__image_for_navigation";
    if (icon == "/icons/icon_list.png"){
        CName = "link_image_WelcomeList"    
    }
  return (
    <Link className="link" to={to} style={style}>
      <img src={icon} alt="le-icon" className={CName} />
      <span className="link__text"> {title} </span>
    </Link>
  ) 
}

export default ButtonLink;
