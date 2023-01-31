import React from 'react';
import { ROUTES } from '../../enums';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <section id="about" className="about">
      <div className="about__wrapper">
        <h2 className="about__title">Для чего вам наш сервис?</h2>
        <ol className="about__list">
          <li className="about__item">
            <h3 className="about__item__title">Узнавайте о мероприятиях</h3>
            <picture className="about__item__img-container">
              <source
                media="(min-width: 1024px)"
                srcSet="
                  img/services/desktop-service-1.jpg    1x,
                  img/services/desktop-service-1_x2.jpg 2x
                "
              />
              <source
                media="(min-width: 640px)"
                srcSet="
                  img/services/tablet-service-1.jpg    1x,
                  img/services/tablet-service-1_x2.jpg 2x
                "
              />
              <img
                className="about__item__img"
                src="img/services/mobile-service-1.jpg"
                srcSet="img/services/mobile-service-1_x2.jpg 2x"
                width="300"
                height="182"
                alt="Стол, сервированный на несколько персон"
              />
            </picture>
            <div className="about__item__text">
              <p>
                Размещаем актуальные, а главное доступные онлайн и оффлайн
                события для жителей города Калининград. Всегда свежие и
                актуальные события в нашем городе, а также актуальные события.
              </p>
            </div>
            <a href="#" className="about__item__link" to={ROUTES.EVENTS}>
              Все мероприятия
            </a>
          </li>
          <li className="about__item">
            <h3 className="about__item__title">
              Подберите себе подходящие услуги
            </h3>
            <picture className="about__item__img-container">
              <source
                media="(min-width: 1024px)"
                srcSet="
                  img/services/desktop-service-2.jpg    1x,
                  img/services/desktop-service-2_x2.jpg 2x
                "
              />
              <source
                media="(min-width: 640px)"
                srcSet="
                  img/services/tablet-service-2.jpg    1x,
                  img/services/tablet-service-2_x2.jpg 2x
                "
              />
              <img
                className="about__item__img"
                src="img/services/mobile-service-2.jpg"
                srcSet="img/services/mobile-service-2_x2.jpg 2x"
                width="300"
                height="182"
                alt="Мужчина за ручной работой"
              />
            </picture>
            <div className="about__item__text">
              <p>
                Размещаем актуальные, а главное доступные онлайн и оффлайн
                события для жителей города Калининград. Всегда свежие и
                актуальные события в нашем городе, а также актуальные события.
              </p>
            </div>
            <a href="#" className="about__item__link" to={ROUTES.SERVICES}>
              Все услуги
            </a>
          </li>
          <li className="about__item">
            <h3 className="about__item__title">
              Узнайте о сообществах вашего города
            </h3>
            <picture className="about__item__img-container">
              <source
                media="(min-width: 1024px)"
                srcSet="
                  img/services/desktop-service-3.jpg    1x,
                  img/services/desktop-service-3_x2.jpg 2x
                "
              />
              <source
                media="(min-width: 640px)"
                srcSet="
                  img/services/tablet-service-3.jpg    1x,
                  img/services/tablet-service-3_x2.jpg 2x
                "
              />
              <img
                className="about__item__img"
                src="img/services/mobile-service-3.jpg"
                srcSet="img/services/mobile-service-3_x2.jpg 2x"
                width="300"
                height="182"
                alt="Стол, сервированный на несколько персон"
              />
            </picture>
            <div className="about__item__text">
              <p>
                Размещаем актуальные, а главное доступные онлайн и оффлайн
                события для жителей города Калининград. Всегда свежие и
                актуальные события в нашем городе, а также актуальные события.
              </p>
            </div>
            <a className="about__item__link" to={ROUTES.COMMUNITIES}>
              Все сообщества
            </a>
          </li>
        </ol>
      </div>
    </section>
  );
};

export default AboutUs;
