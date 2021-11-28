import React, { useContext, useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Cookies from 'universal-cookie';
import ButtonExternalLink from '../../components/ButtonExternalLink';
import MessengerLink from '../../components/MessengerLink';
import SocialNetworkLink from '../../components/SocialNetworkLink';
import StoreBadge from '../../components/StoreBadge';
import Spinner from '../../components/Spinner';
import { AuthContext } from '../../context/AuthContext';
import { DataContext } from '../../context/DataContext';
import { NOTICES } from '../../enums';
import './WelcomeView.css';

const WelcomeView = ({ history }) => {
  const authContext = useContext(AuthContext);
  const dataContext = useContext(DataContext);

  const [community, setCommunity] = useState(null);

  useEffect(() => {
    // Cookies
    const cookies = new Cookies();
    const communityId = cookies.get('communityId');
    if (!communityId) {
      history.push('/communities/');
    } else {
      const { communities } = dataContext;
      const aCommunity = communities.find(c => c.id === communityId);
      if (aCommunity) {
        setCommunity(aCommunity);
      }
    }
  }, [history, dataContext]);

  let userName = null;
  let userAuthorized = false;
  if (authContext.user) {
    const { isAnonymous, displayName } = authContext.user;
    if (!isAnonymous) {
      userName = displayName || 'Не указано';
      userAuthorized = true;
    }
  }

  const [messengers, setMessengers] = useState([]);
  useEffect(() => {
    if (community) {
      let aMessengers = [];
      if (community.telegram) {
        aMessengers = [
          ...aMessengers,
          {
            messengerName: 'telegram',
            href: community.telegram,
            icon: '/icons/telegram.svg',
          },
        ];
      }
      if (community.whatsapp) {
        aMessengers = [
          ...aMessengers,
          {
            messengerName: 'whatsapp',
            href: community.whatsapp,
            icon: '/icons/whatsapp.svg',
          },
        ];
      }
      if (community.viber) {
        aMessengers = [
          ...aMessengers,
          {
            messengerName: 'viber',
            href: community.viber,
            icon: '/icons/viber.svg',
          },
        ];
      }
      setMessengers(aMessengers);
    }
  }, [community]);

  const [socialLinks, setSocialLinks] = useState([]);
  useEffect(() => {
    if (community) {
      let aSocialLinks = [];
      if (community.vkontakte) {
        aSocialLinks = [
          ...aSocialLinks,
          {
            name: 'vkontakte',
            href: community.vkontakte,
            icon: '/icons/vk.svg',
            title: 'ВКонтакте',
          },
        ];
      }
      if (community.instagram) {
        aSocialLinks = [
          ...aSocialLinks,
          {
            name: 'instagram',
            href: community.instagram,
            icon: '/icons/instagram.svg',
            title: 'Instagram',
          },
        ];
      }
      if (community.strava) {
        aSocialLinks = [
          ...aSocialLinks,
          {
            name: 'strava',
            href: community.strava,
            icon: '/icons/strava.png',
            title: 'Strava',
          },
        ];
      }
      if (community.youtube) {
        aSocialLinks = [
          ...aSocialLinks,
          {
            name: 'youtube',
            href: community.youtube,
            title: 'YouTube',
          },
        ];
      }
      if (community.website) {
        aSocialLinks = [
          ...aSocialLinks,
          {
            name: 'website',
            href: community.website,
            title: 'Сайт',
          },
        ];
      }
      setSocialLinks(aSocialLinks);
    }
  }, [community]);

  if (!community) {
    return <Spinner message={NOTICES.LOADING} />;
  }
  return (
    <div className="welcomeview">
      {userAuthorized && (
        <div className="welcomeview__block">
          <div className="container container-center">
            <div>
              <span>Добро пожаловать, </span>
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
          </div>
        </div>
      )}

      <div className="welcomeview__block">
        <h1>
          {!!community.logo_url && (
            <img
              className="community__logo"
              src={community.logo_url}
              alt="logo"
            />
          )}
          <span>{community.name}</span>
        </h1>
        <p>{community.description}</p>
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

      {messengers.length !== 0 ? (
        <div className="welcomeview__block">
          <div className="container container-center">
            <h4>Чаты сообщества</h4>
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
      ) : (
        ''
      )}

      <div className="welcomeview__block">
        <div className="container container-center">
          <h4>Ссылки</h4>
          <p>
            В этом разделе ссылки на Instagram, YouTube, социальные сети и т.п.
          </p>
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
          <h4>Дополнительно</h4>
          <p>Для смены сообщества нажмите кнопку «Сообщества»</p>
          <Link to="/communities" className="communities-btn">
            <img
              src="/icons/icon_community.svg"
              alt="communities"
              className="communities-btn__icon"
            />
            <span className="communities-btn__title">Сообщества</span>
          </Link>

          {!userAuthorized && (
            <>
              <p>Если Вы - организатор, то «Вход для оргов» для Вас</p>
              <Link to="/signin" className="signin-btn">
                <span className="signin-btn__title">Вход для оргов</span>
              </Link>
            </>
          )}
        </div>
      </div>

      <div className="welcomeview__block">
        <div className="container container-center">
          <p>Доступно мобильное приложение</p>
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
