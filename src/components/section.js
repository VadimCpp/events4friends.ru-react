import React from 'react';
import { seasonal } from '../utils';

const Section = ({ id, title, link, image, slug, description }) => {
  const even = Boolean(id % 2);

  return (
    <section id={slug} className={even ? "section" : seasonal("section")}>
      <div className={even ? "section__container" : "section__container section__container--reverse"}>
        <div className="section__column">
          <img
            className="section__image"
            src={`img/sections/${image}`} 
            alt={title}
          />
        </div>
        <div className="section__column">
          <div className={even ? "section__data" : "section__data section__data--right"}>
            <header className="section__header">
              <p>
                <span className={seasonal("section__nummer")}>
                  {id}
                </span>
              </p>
              <h2 className="section__title">
                {title}
              </h2>
            </header>
            <p className="section__description">
              {description}
            </p>
            <p>
              <a href={link} className={seasonal("section__button")}>
                Группа ВКонтакте
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section;
