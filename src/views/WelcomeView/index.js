import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom';
import ReactStoreBadges from 'react-store-badges';
import ButtonLink from '../../components/ButtonLink';
import ButtonExternalLink from '../../components/ButtonExternalLink';
import MessengerLink from '../../components/MessengerLink';
import SocialNetworkLink from '../../components/SocialNetworkLink';
import FeatureLink from '../../components/FeatureLink';
import { AuthContext } from '../../context/AuthContext';
import { DataContext } from '../../context/DataContext';
import './WelcomeView.css';

const WelcomeView = ({ history }) => {
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
      href: 'https://invite.viber.com/?g2=AQBA7jF9Y7%2BXBkqTI0PoYF%2BmnEMluxPdGZy8wJQ3PRPBLT%2BMeh344RxBuBUTVc6B',
      icon: '/icons/viber.svg',
		},
		{
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
    }
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
              <span>Добро пожаловать в цифровое пространство! </span>
              <button
                type="button"
                className="btn btn-link btn-link-vk"
                onClick={() => {
                  history.push('signin/');
                }}
              >
                <span>Войти</span>
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="welcomeview__block welcome__features">
        <div className="container container-center">
          <p>Мероприятия тут:</p>

          <FeatureLink
            LinkComponent={ButtonLink}
            to="/events"
            icon="/icons/icon_list.svg"
            title="Все мероприятия"
          />
        </div>

        <div className="container container-center mt-4">
          <p>Услуги:</p>

          <FeatureLink
            LinkComponent={ButtonLink}
            to="/services"
            icon="/icons/icon_service.svg"
            title="Все услуги"
          />
        </div>

        <div className="container container-center mt-4">
          <p>Сообщества (формируются):</p>

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
          <p>Выберите мессенджер для общения:</p>
          <ul className="welcomeview__messengers-list">
            {messengers.map(messenger => (
              <li className="welcomeview__messengers-item">
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
              <li className="welcomeview__social-item">
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
          <p>Наше мобильное приложение:</p>
          <div className="d-flex justify-content-center">
            <div className="mr-1">
              <ReactStoreBadges
                platform="ios"
                url="https://apps.apple.com/us/app/events4friends-%D1%81%D0%BE%D0%BE%D0%B1%D1%89%D0%B5%D1%81%D1%82%D0%B2%D0%BE/id1509893426"
                locale="en-us"
                width={120}
              />
            </div>
            <div className="ml-1">
              <ReactStoreBadges
                platform="android"
                url="https://play.google.com/store/apps/details?id=com.roscomputing.events4friends"
                locale="en-us"
                width={120}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container container-center">
        <p className="welcomeview__footer">
          Здесь действуют правила поведения в общественных местах. Разработано в{' '}
          <a href="https://roscomputing.com/">Роскомпьютинг</a>.
          <span> version - {dataContext.config.version}.</span>
        </p>
      </div>
    </div>
  );
};

export default withRouter(WelcomeView);
