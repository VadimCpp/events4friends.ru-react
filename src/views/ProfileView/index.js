/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Button from '../../components/Button';
import ButtonExternalLink from '../../components/ButtonExternalLink';
import MessengerLink from '../../components/MessengerLink';
import './ProfileView.css';

const ProfileView = () => {
  const history = useHistory();
  const [displayName, setDisplayName] = useState('');

  const { user, updateProfile } = useContext(AuthContext);
  const userAuthorized = !!(user && !user.isAnonymous);

  useEffect(() => {
    if (user) {
      if (user.isAnonymous) {
        history.push('/signin');
      }
      if (user.displayName && !displayName) {
        setDisplayName(user.displayName);
      }
    }
  }, [displayName, history, user]);

  const handleDisplayNameChange = e => {
    setDisplayName(e.target.value);
  };

  const updateDisplayName = () => {
    if (!displayName) {
      alert('Заполните пожалуйста профиль');
    } else {
      updateProfile(displayName);
      history.push('/');
    }
  };

  return (
    <main className="loginview">
      <h1 className="visually-hidden">Профиль пользователя</h1>
      <section className="loginview__block">
        <div className="container container-center">
          <h2 className="visually-hidden">Форма авторизации</h2>
          {userAuthorized ? (
            <div>
              <p>
                <span>
                  Заполните, пожалуйста, профиль. <br />
                  Имя будет отображено в анонсах Ваших мероприятий.
                </span>
              </p>
              <div className="textinput">
                <label>
                  <span className="textinput__label">ФИО:</span>
                  <input
                    className="textinput__input"
                    type="text"
                    id="displayName"
                    name="displayName"
                    value={displayName}
                    onChange={handleDisplayNameChange}
                  />
                </label>
              </div>
              <Button onPress={updateDisplayName} icon="/icons/icon_save.svg">
                Сохранить и продолжить
              </Button>
            </div>
          ) : (
            <div>
              <p>Подождите...</p>
            </div>
          )}
        </div>
      </section>
      <section className="loginview__block">
        <div className="container container-center">
          <h2 className="visually-hidden">Как заполнить профиль</h2>
          <p>
            Пожалуйста, заполните свой профиль. Если Вам не понятно, как это
            сделать, задайте вопрос в чат.
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

export default ProfileView;
