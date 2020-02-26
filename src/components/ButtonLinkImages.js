import React from 'react'
import { Link } from 'react-router-dom'
import './ButtonLink.css'

function ButtonLinkImages({ icon }) {
    var CName = "link__image_for_navigation";
    if (icon == "/icons/icon_list.png"){
        CName = "link_image_WelcomeList"    
    }
    return (
    <img src={icon} alt="le-icon" className={CName}/>
  ) 
}

export default ButtonLinkImages;