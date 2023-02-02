import React from 'react';
import StoreBadge from '../storebadge';
import { STORE_BADGE_ITEMS } from '../../enums';

const Footer = () => {
  return ( 
    <div className="bg-blue-600 p-8">
      <div className="container mx-auto">
        <p className="text-white text-lg p-5">Попробуйте наше мобильное приложение</p>
        <div className="flex flex-col justify-center align-middle">
          {
            STORE_BADGE_ITEMS.map(storeBadge => (
              <div className='mx-auto pb-5' key={storeBadge.platform} >
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
