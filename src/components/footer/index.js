import React from 'react';
import StoreBadge from '../storebadge';
import { STORE_BADGE_ITEMS } from '../../enums';

const Footer = () => {
  return (
    <div className="bg-sky-600">
      <div className="container mx-auto pt-8 pb-10 px-5">
        <p className="text-white text-lg pb-7">Попробуйте наше мобильное приложение</p>
        <div className="flex flex-col md:flex-row justify-center align-middle">
          {
            STORE_BADGE_ITEMS.map(storeBadge => (
              <div className='mx-auto md:mx-5 pb-5' key={storeBadge.platform} >
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
