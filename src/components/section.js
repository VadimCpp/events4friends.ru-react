import React from 'react';

const Section = ({ id, title, link, image, slug, description }) => {
  const even = Boolean(id % 2);

  return (
    <section id={slug} className={even ? "bg-white" : "bg-sky-200"}>
      <div className={
        even ? 
        "container mx-auto pt-8 pb-10 px-5 md:flex md:space-x-5" :
        "container mx-auto pt-8 pb-10 px-5 md:flex md:space-x-5 md:flex-row-reverse md:space-x-reverse"
      }>
        <div className="md:flex-1">
          <img
            className="w-full object-cover md:h-full rounded-lg"
            src={`img/sections/${image}`} 
            alt={title}
          />
        </div>
        <div className="pt-5 md:pt-0 md:flex-1">
          <div className={even ? "flex flex-col space-y-5" : "flex flex-col space-y-5 md:text-right"}>
            <p className="pt-2">
              <span className="border-sky-700 border-2 border-dotted text-black p-2 px-4 rounded-md">
                {id}
              </span>
            </p>
            <h2 className="text-2xl font-semibold">
              {title}
            </h2>
            <p className="text-lg">
              {description}
            </p>
            <div className="pt-3 pb-4">
              <a href={link} className="text-xl text-center text-white bg-sky-600 border-sky-700 p-3 pb-4 rounded-xl border-2 shadow-lg w-60 mt-auto">
                Группа ВКонтакте
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section;
