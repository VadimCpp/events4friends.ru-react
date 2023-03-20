import React from 'react';
// import StoreBadge from './storebadge';
// import { STORE_BADGE_ITEMS } from '../enums';
import { seasonal } from '../utils';

const Footer = () => {
  return (
    <div className={seasonal("footer")}>
      <div className="container mx-auto pt-8 pb-10 px-5">
        <p className="text-white text-lg pb-7">Мобильное приложение находится в стадии обновления. Ссылка появится позже.</p>
        { /*
          <p className="text-white text-lg pb-7">Попробуйте наше мобильное приложение</p>
          <div className="flex flex-col md:flex-row space-y-5 md:space-x-5 md:space-y-0 justify-center align-middle">
            {
              STORE_BADGE_ITEMS.map(storeBadge => (
                <div className='mx-auto md:mx-0' key={storeBadge.platform} >
                  <StoreBadge platform={storeBadge.platform} width={String(storeBadge.width)} />
                </div>
              ))
            }
          </div>
        */ }
      </div>
    </div>
  );
};

export default Footer;
