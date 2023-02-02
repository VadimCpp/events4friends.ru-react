import React from 'react';
import './section.css';

const Section = ({ id, title, link, image, slug, description }) => {
  const even = Boolean(id % 2);

  return (
    <section id={slug} className={even ? "bg-white" : "bg-sky-200"}>
      <div className="container mx-auto pt-8 pb-10 px-5 md:flex">
        <div className="md:flex-1 pr-5">
          <img
            className="w-full object-cover md:h-full rounded-lg"
            src={`img/sections/${image}`} 
            alt={title}
          />
        </div>
        <div className="md:flex-1">
          <p className='pt-7 md:pt-2'>
            <span className="border-sky-700 border-2 border-dotted text-black p-2 px-4 rounded-md">
              {id}
            </span>
          </p>
          <h2 className="text-2xl font-semibold pt-5">
            {title}
          </h2>
          <p className="text-lg pt-3">
            {description}
          </p>
          <div className="pt-10 pb-4">
            <a href={link} className="text-xl text-center text-white bg-sky-600 border-sky-700 p-3 pb-4 rounded-xl border-2 shadow-lg w-60 mt-auto">
              Группа ВКонтакте
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section;
