import React from 'react';
import StoreBadge from '../../components/StoreBadge';

import { STORE_BADGE_ITEMS } from '../../enums';
import './WelcomeView.css';
import AboutUs from '../../components/AboutUs';

const WelcomeView = () => {

  return (
    <main>
      <div className="page-main__title-wrapper">
        <h1 className="page-main__title">
          Events4Friends — городские совместности в Калининграде
        </h1>
      </div>

      <AboutUs />

      <div className="welcomeview__block">
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

      <div className="container container-center">
        <p className="welcomeview__footer">
          Здесь действуют правила поведения в общественных местах. При
          поддержке <a href="https://roscomputing.com/">Роскомпьютинг</a>.
          <span> version — 3.0</span>
        </p>
      </div>
    </main>
  );
};

export default WelcomeView;
