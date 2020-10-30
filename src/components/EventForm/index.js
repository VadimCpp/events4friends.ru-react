import React from 'react';
import ButtonLink from '../ButtonLink';
import ButtonExternalLink from '../ButtonExternalLink';

import EventForm from './EventForm';
import './EventForm.css';

const EventFormView = ({
  editMode = true,
  event,
  isAuth,
  onSave = () => {},
}) => {
  const formContent = isAuth ? (
    <EventForm defaultEvent={event} onSave={onSave} editMode={editMode} />
  ) : (
    <div>
      <p>Для того, чтобы редактировать мероприятия, выполните вход</p>
    </div>
  );

  return (
    <div>
      <div>
        <ButtonLink
          to="/events"
          icon="/icons/icon_arrow_back.svg"
          title="К списку"
          style={{
            width: 155,
            display: 'block',
            marginRight: 'auto',
            marginLeft: 'auto',
            marginBottom: 10,
            borderColor: 'rgba(77, 77, 77, .2)',
            borderRadius: '48px',
          }}
        />
      </div>

      {formContent}

      <div className="border-top">
        <div className="container container-center pt-4 pb-5">
          <p>
            У вас есть вопросы о том, как редактировать мероприятие? Задайте
            вопрос в чате:
          </p>
          <ButtonExternalLink
            href="tg://resolve?domain=events4friends"
            icon="/icons/telegram.svg"
            alt="telegram"
            style={{
              borderColor: '#139BD0',
              margin: 8,
            }}
          />
          <ButtonExternalLink
            href="https://chat.whatsapp.com/DWUaZ1bsuxwJLALyvBYTt8"
            icon="/icons/whatsapp.svg"
            alt="whatsapp"
            style={{
              borderColor: '#57BB63',
              margin: 8,
            }}
          />
          <ButtonExternalLink
            href="https://invite.viber.com/?g2=AQBA7jF9Y7%2BXBkqTI0PoYF%2BmnEMluxPdGZy8wJQ3PRPBLT%2BMeh344RxBuBUTVc6B"
            icon="/icons/viber.svg"
            alt="viber"
            style={{
              borderColor: '#7C519B',
              margin: 8,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default React.memo(EventFormView, (prev, next) => {
  if (prev.event.id !== next.event.id) {
    return false;
  }

  if (prev.event.contact !== next.event.contact) {
    return false;
  }

  if (prev.isAuth !== next.isAuth) {
    return false;
  }

  return true;
});
