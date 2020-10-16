/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import Button from '../components/Button';
import ButtonLink from '../components/ButtonLink';
import ButtonExternalLink from '../components/ButtonExternalLink';
import { AuthContext } from '../context/AuthContext';
import 'firebase/auth';

import './LoginView.css';

const LoginView = ({ history }) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const authContext = useContext(AuthContext);

  const handleLoginChange = e => {
    setLogin(e.target.value);
  };

  const handlePasswordChange = e => {
    setPassword(e.target.value);
  };

  const { user, signIn } = authContext;
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
    <div className="loginview">
      <div className="loginview__block">
        <div className="container container-center">
          {userAuthorized ? (
            <div>
              <p>
                <span>Вход выполнен, {userName}! </span>
              </p>
              <ButtonLink
                to="/"
                icon="/icons/icon_arrow_back.svg"
                title="Вернуться на экран приветствия"
                style={{
                  width: 200,
                  display: 'block',
                  marginRight: 'auto',
                  marginLeft: 'auto',
                  marginBottom: 26,
                  borderColor: 'rgba(77, 77, 77, .2)',
                  borderRadius: '48px',
                }}
              />
            </div>
          ) : (
            <div>
              <div className="textinput">
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
              </div>
              <div className="textinput">
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
              </div>
              <Button
                onPress={() => {
                  signIn(login, password);
                }}
                icon="/icons/icon_login.svg"
              >
                Войти
              </Button>
            </div>
          )}
        </div>
      </div>
      <div className="loginview__block">
        <div className="container container-center">
          <p>
            Вход в систему дает возможность создавать услуги и мероприятия.
            Логин и пароль можно получить в одном из чатов:
          </p>
          <ButtonExternalLink
            href="tg://resolve?domain=events4friends"
            icon="/icons/telegram.svg"
            alt="telegram"
            style={{
              borderColor: '#139BD0',
              margin: 8,
              borderRadius: '48px',
            }}
          />
          <ButtonExternalLink
            href="https://chat.whatsapp.com/DWUaZ1bsuxwJLALyvBYTt8"
            icon="/icons/whatsapp.svg"
            alt="whatsapp"
            style={{
              borderColor: '#57BB63',
              margin: 8,
              borderRadius: '48px',
            }}
          />
          <ButtonExternalLink
            href="https://invite.viber.com/?g2=AQBA7jF9Y7%2BXBkqTI0PoYF%2BmnEMluxPdGZy8wJQ3PRPBLT%2BMeh344RxBuBUTVc6B"
            icon="/icons/viber.svg"
            alt="viber"
            style={{
              borderColor: '#7C519B',
              margin: 8,
              borderRadius: '48px',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default withRouter(LoginView);
