import React, { useState } from 'react';
import { Bars3Icon } from '@heroicons/react/24/solid';
import { Transition } from '@headlessui/react'
import { SECTIONS } from '../../enums';
import './header.css';

const Header = () => {
  const menuItems = SECTIONS.map(item => (
    <li key={item.title}>
      <a href={`#${item.slug}`} className="cursor-pointer">
        <span className="page-navigation__item"> {item.title}</span>
      </a>
    </li>
  ));

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const onMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-sky-600">
      <div className="container mx-auto px-5">
        <div className="border-b-2 border-b-sky-300">
          <div className="flex flex-row space-x-5 py-5">
            <img
              className="w-12 md:w-16"
              src="/icons/community/events4friends-ny-64x64.png"
              width="32"
              height="32"
              alt="Events for friends logo"
            />
            <div className='text-white text-lg md:text-2xl mt-auto mb-auto'>events4friends</div>
            <div className='grow'></div>
            <button type="button" className="block lg:hidden" onClick={onMenuClick}>
              <Bars3Icon className="h-12 w-12 text-white"/>
            </button>
            <nav className={"hidden lg:block lg:mt-auto lg:mb-auto"}>
              <ul className={"flex flex-row gap-10"} onClick={closeMenu}>{menuItems}</ul>
            </nav>

            <Transition
              show={isMenuOpen}
            >
              {/* Background overlay */}
              <Transition.Child
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <ul className={"bg-white fixed left-0 right-0 top-0 shadow-2xl shadow-black"} onClick={closeMenu}>
                  {/* Sliding sidebar */}
                  <Transition.Child
                    enter="transition ease-in-out duration-300 transform"
                    enterFrom="-translate-y-full"
                    enterTo="translate-y-0"
                    leave="transition ease-in-out duration-300 transform"
                    leaveFrom="translate-y-0"
                    leaveTo="-translate-y-full"
                  >
                    <div className="text-center flex flex-col gap-8 pt-10 pb-10">
                      {menuItems}
                    </div>
                  </Transition.Child>
                </ul>
              </Transition.Child>

            </Transition>
          </div>
        </div>
        <h1 className="text-2xl md:text-6xl text-white text-bold pt-5 pb-7 md:pt-10 md:pb-14">
          Городские совместности в Калининграде
        </h1>
      </div>
    </header>
  );
};

export default Header;
