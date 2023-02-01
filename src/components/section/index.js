import React from 'react';
import './section.css';

const Section = ({ id, title, link, image, slug, description }) => {
  const even = Boolean(id % 2);

  return (
    <section id={slug} className="about">
      <div className="about__wrapper">
        <div className="about__list">
          <div className={`about__item ${!even ? "about__item--right" : "about__item--left"}`}>
            <div className="about__item__no">{id}</div>
            <h3 className="about__item__title">{title}</h3>
            <picture className={`about__item__img-container ${even ? "about__item__img-container--right" : "about__item__img-container--left"}`}>
              {/* <source
                media="(min-width: 1024px)"
                srcSet="
                  img/services/desktop-service-1.jpg 1x,
                  img/services/desktop-service-1_x2.jpg 2x
                "
              />
              <source
                media="(min-width: 640px)"
                srcSet="
                  img/services/tablet-service-1.jpg 1x,
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
              />*/}
              <img
                className="about__item__img"
                src={`img/sections/${image}`}
                alt={title}
              />
            </picture>
            <div className="about__item__text">
              <p> {description} </p>
            </div>
            <a href={link} className="about__item__link">
              Группа ВКонтакте
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section;
