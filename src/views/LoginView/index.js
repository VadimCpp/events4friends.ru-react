/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import Button from '../../components/Button';
import ButtonLink from '../../components/ButtonLink';
import ButtonExternalLink from '../../components/ButtonExternalLink';
import MessengerLink from '../../components/MessengerLink';
import { AuthContext } from '../../context/AuthContext';
import 'firebase/auth';

import './LoginView.css';

const LoginView = ({ history }) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const { user, signIn } = useContext(AuthContext);

  const handleLoginChange = e => {
    setLogin(e.target.value.trim());
  };

  const handlePasswordChange = e => {
    setPassword(e.target.value.trim());
  };

  const handlerSubmit = e => {
    e.preventDefault();
    if (!login || !password) {
      return;
    }
    signIn(login, password);
  };

  let userName = null;
  let userAuthorized = false;
  if (user) {
    const { isAnonymous, displayName } = user;
    if (isAnonymous) {
      userName = 'Аноним';
    } else {
      userName = displayName;
      if (!userName) {
        history.push('/profile');
      }
      userAuthorized = true;
    }
  }

  return (
    <main className="loginview">
      <h1 className="visually-hidden">Страница входа</h1>
      <div>
        <ButtonLink
          to="/"
          icon="/icons/icon_arrow_back.svg"
          title="На главную"
          className="btn-back"
        />
      </div>
      <section className="loginview__block">
        <div className="container container-center">
          <h2 className="visually-hidden">Форма входа</h2>
          {userAuthorized ? (
            <>
              <p>Вход выполнен, {userName}!</p>
              <ButtonLink
                to="/"
                icon="/icons/icon_arrow_back.svg"
                title="Вернуться на экран приветствия"
                className="btn-back"
              />
            </>
          ) : (
            <form className="loginview__form">
              <p className="textinput">
                <label>
                  <span className="textinput__label">E-mail:</span>
                  <input
                    className="textinput__input"
                    type="email"
                    id="login"
                    name="login"
                    value={login}
                    onChange={handleLoginChange}
                  />
                </label>
              </p>
              <p className="textinput">
                <label>
                  <span className="textinput__label">Пароль:</span>
                  <input
                    className="textinput__input"
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                </label>
              </p>
              <Button onPress={handlerSubmit} icon="/icons/icon_login.svg">
                Войти
              </Button>
            </form>
          )}
        </div>
      </section>
      <section className="loginview__block">
        <div className="container container-center">
          <h2 className="visually-hidden">Где взять данные авторизации</h2>
          <p>
            Вход в систему дает возможность создавать услуги и мероприятия.
            Логин и пароль можно получить в одном из чатов:
          </p>
          <MessengerLink
            ExternalLinkComponent={ButtonExternalLink}
            messengerName="telegram"
          />
          <MessengerLink
            ExternalLinkComponent={ButtonExternalLink}
            messengerName="whatsapp"
          />
          <MessengerLink
            ExternalLinkComponent={ButtonExternalLink}
            messengerName="viber"
          />
        </div>
      </section>
    </main>
  );
};

export default withRouter(LoginView);
