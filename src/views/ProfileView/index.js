/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Button from '../../components/Button';
import ButtonExternalLink from '../../components/ButtonExternalLink';
import MessengerLink from '../../components/MessengerLink';

const ProfileView = () => {
  const authContext = useContext(AuthContext);
  const history = useHistory();
  const [displayName, setDisplayName] = useState('');

  const { user, updateProfile } = authContext;
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
    <div className="loginview">
      <div className="loginview__block">
        <div className="container container-center">
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
      </div>
      <div className="loginview__block">
        <div className="container container-center">
          <p>
            Пожалуйста, заполните свой профиль. Если Вам не понятно, как это
            сделать, задайте вопрос в чат.
          </p>
          <MessengerLink
            ExternalLinkComponent={ButtonExternalLink}
            href="tg://resolve?domain=events4friends"
            icon="/icons/telegram.svg"
            messengerName="telegram"
          />
          <MessengerLink
            ExternalLinkComponent={ButtonExternalLink}
            href="https://chat.whatsapp.com/DWUaZ1bsuxwJLALyvBYTt8"
            icon="/icons/whatsapp.svg"
            messengerName="whatsapp"
          />
          <MessengerLink
            ExternalLinkComponent={ButtonExternalLink}
            href="https://invite.viber.com/?g2=AQBA7jF9Y7%2BXBkqTI0PoYF%2BmnEMluxPdGZy8wJQ3PRPBLT%2BMeh344RxBuBUTVc6B"
            icon="/icons/viber.svg"
            messengerName="viber"
          />
					<MessengerLink
            ExternalLinkComponent={ButtonExternalLink}
            href="#"
            icon="https://www.flaticon.com/svg/static/icons/svg/2111/2111609.svg"
            messengerName="skype"
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
