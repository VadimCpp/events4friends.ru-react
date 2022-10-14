import React, { useContext, useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import ButtonExternalLink from '../../components/ButtonExternalLink';
import MessengerLink from '../../components/MessengerLink';
import StoreBadge from '../../components/StoreBadge';
import Spinner from '../../components/Spinner';
import { AuthContext } from '../../context/AuthContext';
import { DataContext } from '../../context/DataContext';
import { NOTICES, STORE_BADGE_ITEMS } from '../../enums';
import './WelcomeView.css';
import AboutUs from '../../components/AboutUs';
import { WelcomeBlockContainer } from './components/WelcomeBlockContainer';

const WelcomeView = ({ history }) => {
  const authContext = useContext(AuthContext);
  const dataContext = useContext(DataContext);
  const [community, setCommunity] = useState(null);

  useEffect(() => {
    if (dataContext.communities.length > 0) {
      setCommunity(dataContext.communities[0]);
    }
  }, [dataContext.communities]);

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
    <main>
      <div className="page-main__title-wrapper">
        <h1 className="page-main__title">
          Events4Friends — нетворкинг в Калининграде
        </h1>
      </div>

      {userAuthorized && (
        <WelcomeBlockContainer>
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
        </WelcomeBlockContainer>
      )}

      <AboutUs />

      <div className="welcomeview">
        {messengers.length !== 0 ? (
          <WelcomeBlockContainer>
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
          </WelcomeBlockContainer>
        ) : (
          ''
        )}

        <WelcomeBlockContainer>
          <h4>Ссылки</h4>
          <p>
            В этом разделе ссылки на Instagram, YouTube, социальные сети и т.п.
          </p>
          <ul className="welcomeview__social-list">
            {socialLinks.map(link => (
              <li className="welcomeview__social-item" key={link.name}>
                <ButtonExternalLink
                  href={link.href}
                  icon={link.icon}
                  alt={link.name}
                  title={link.title}
                  classList={['social__link', `social__link--${link.name}`]}
                />
              </li>
            ))}
          </ul>
        </WelcomeBlockContainer>

        {!userAuthorized && (
          <WelcomeBlockContainer>
            <p>Если Вы - организатор, то «Вход для оргов» для Вас</p>
            <Link to="/signin" className="signin-btn">
              <span className="signin-btn__title">Вход для оргов</span>
            </Link>
          </WelcomeBlockContainer>
        )}

        <WelcomeBlockContainer>
          <p>Доступно мобильное приложение</p>
          <div className="d-flex justify-content-center">
            {STORE_BADGE_ITEMS.map(storeBadge => (
              <div className="mr-1">
                <StoreBadge
                  platform={storeBadge.platform}
                  width={storeBadge.width}
                />
              </div>
            ))}
          </div>
        </WelcomeBlockContainer>

        <div className="container container-center">
          <p className="welcomeview__footer">
            Здесь действуют правила поведения в общественных местах. При
            поддержке <a href="https://roscomputing.com/">Роскомпьютинг</a>.
            <span> version - {dataContext.config.version}.</span>
          </p>
        </div>
      </div>
    </main>
  );
};

export default withRouter(WelcomeView);
