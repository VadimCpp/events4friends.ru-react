import React from 'react';
import StoreBadge from '../storebadge';
import { STORE_BADGE_ITEMS } from '../../enums';
import './footer.css';

const Footer = () => {
  return ( 
    <div className="welcomeview__footer">
      <div className="container container-center">
        <p>Доступно мобильное приложение</p>
        <div className="d-flex justify-content-center">
          {
            STORE_BADGE_ITEMS.map( storeBadge => (
              <div className="mr-1" key={storeBadge.platform}>
                <StoreBadge platform={storeBadge.platform} width={String(storeBadge.width)} />
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default Footer;
