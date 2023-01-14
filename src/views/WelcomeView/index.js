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

      <AboutUs />

      <div className="welcomeview">
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

        {!userAuthorized && (
          <div className="welcomeview__block">
            <div className="container container-center">
              <p>Если Вы - организатор, то «Вход для оргов» для Вас</p>
              <Link to="/signin" className="signin-btn">
                <span className="signin-btn__title">Вход для оргов</span>
              </Link>
            </div>
          </div>
        )}

        <div className="welcomeview__block">
          <div className="container container-center">
            <p>Доступно мобильное приложение</p>
            <div className="d-flex justify-content-center">
              {
                STORE_BADGE_ITEMS.map( storeBadge => (
                  <div className="mr-1">
                    <StoreBadge platform={storeBadge.platform} width={storeBadge.width} />
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
            <span> version - {dataContext.config.version}.</span>
          </p>
        </div>
      </div>
    </main>
  );
};

export default withRouter(WelcomeView);
