import React, { useContext, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Cookies from 'universal-cookie';
import ButtonLink from '../../components/ButtonLink';
import ButtonExternalLink from '../../components/ButtonExternalLink';
import MessengerLink from '../../components/MessengerLink';
import SocialNetworkLink from '../../components/SocialNetworkLink';
import FeatureLink from '../../components/FeatureLink';
import StoreBadge from '../../components/StoreBadge';
import { AuthContext } from '../../context/AuthContext';
import { DataContext } from '../../context/DataContext';
import './WelcomeView.css';

const WelcomeView = ({ history }) => {
  useEffect(() => {
    // Cookies
    const cookies = new Cookies();
    const communityId = cookies.get('communityId');
    if (!communityId) {
      history.push('/communities/');
    } else {
      // eslint-disable-next-line no-console
      console.log(`Current community id is ${communityId}`);
    }
  }, [history]);

  const authContext = useContext(AuthContext);
  const dataContext = useContext(DataContext);

  let userName = null;
  let userAuthorized = false;
  if (authContext.user) {
    const { isAnonymous, displayName } = authContext.user;
    if (!isAnonymous) {
      userName = displayName || 'Не указано';
      userAuthorized = true;
    }
  }

  const messengers = [
    {
      messengerName: 'telegram',
      href: 'tg://resolve?domain=events4friends',
      icon: '/icons/telegram.svg',
    },
    {
      messengerName: 'whatsapp',
      href: 'https://chat.whatsapp.com/DWUaZ1bsuxwJLALyvBYTt8',
      icon: '/icons/whatsapp.svg',
    },
    {
      messengerName: 'viber',
      href:
        'https://invite.viber.com/?g2=AQBA7jF9Y7%2BXBkqTI0PoYF%2BmnEMluxPdGZy8wJQ3PRPBLT%2BMeh344RxBuBUTVc6B',
      icon: '/icons/viber.svg',
    },
  ];

  const socialLinks = [
    {
      name: 'vkontakte',
      href: 'https://vk.com/kldevents4friends',
      icon: '/icons/vk.svg',
      title: 'Открыть ВКонтакте',
    },
    {
      name: 'instagram',
      href: 'https://www.instagram.com/kldevents4friends/',
      icon: '/icons/instagram.svg',
      title: 'Открыть Instagram',
    },
    {
      name: 'strava',
      href: 'https://www.strava.com/clubs/events4friends',
      icon: '/icons/strava.png',
      title: 'Открыть Strava',
    },
  ];

  return (
    <div className="welcomeview">
      <div className="welcomeview__block">
        <div className="container container-center">
          {userAuthorized ? (
            <div>
              <span>Добро пожаловать в цифровое пространство, </span>
              <button
                type="button"
                className="btn btn-link btn-link-vk"
                onClick={() => history.push('/profile')}
              >
                <span>{userName}</span>
              </button>
              <span>!</span>
              <br />
              <button
                type="button"
                className="btn btn-link btn-link-vk"
                onClick={() => authContext.signOut()}
              >
                <span>Выйти</span>
              </button>
            </div>
          ) : (
            <div>
              <span>Добро пожаловать в цифровое пространство!</span>
            </div>
          )}
        </div>
      </div>

      <div className="welcomeview__block welcome__features">
        <Link to="/events" className="events-btn">
          <img
            src="/icons/icon_list.svg"
            alt="events"
            className="events-btn__icon"
          />
          <span className="events-btn__title">События</span>
        </Link>
        <Link to="/services" className="services-btn">
          <img
            src="/icons/icon_service.svg"
            alt="events"
            className="services-btn__icon"
          />
          <span className="services-btn__title">Услуги</span>
        </Link>
      </div>

      <div className="welcomeview__block">
        <div className="container container-center">
          <p>Выберите мессенджер для общения:</p>
          <ul className="welcomeview__messengers-list">
            {messengers.map(messenger => (
              <li
                className="welcomeview__messengers-item"
                key={messenger.messengerName}
              >
                <MessengerLink
                  ExternalLinkComponent={ButtonExternalLink}
                  {...messenger}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="welcomeview__block">
        <div className="container container-center">
          <p>Мы в социальных сетях:</p>
          <ul className="welcomeview__social-list">
            {socialLinks.map(link => (
              <li className="welcomeview__social-item" key={link.name}>
                <SocialNetworkLink
                  ExternalLinkComponent={ButtonExternalLink}
                  {...link}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="welcomeview__block">
        <div className="container container-center">
          <FeatureLink
            LinkComponent={ButtonLink}
            to="/communities"
            icon="/icons/icon_community.svg"
            title="Все сообщества"
          />
        </div>
      </div>

      <div className="welcomeview__block">
        <div className="container container-center">
          <p>Наше мобильное приложение:</p>
          <div className="d-flex justify-content-center">
            <div className="mr-1">
              <StoreBadge platform="ios" width={120} />
            </div>
            <div className="ml-1">
              <StoreBadge platform="android" width={120} />
            </div>
          </div>
        </div>
      </div>

      {!userAuthorized && (
        <div className="welcomeview__block">
          <div className="container container-center">
            <p>Организаторы мероприятий могут создавать анонсы мероприятий</p>
            <button
              type="button"
              className="btn btn-link btn-link-vk"
              onClick={() => {
                history.push('signin/');
              }}
            >
              <span>Вход для организаторов</span>
            </button>
          </div>
        </div>
      )}

      <div className="container container-center">
        <p className="welcomeview__footer">
          Здесь действуют правила поведения в общественных местах. При поддержке{' '}
          <a href="https://roscomputing.com/">Роскомпьютинг</a>.
          <span> version - {dataContext.config.version}.</span>
        </p>
      </div>
    </div>
  );
};

export default withRouter(WelcomeView);
