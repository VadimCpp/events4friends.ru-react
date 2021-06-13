import React from 'react';
import PropTypes from 'prop-types';
import ButtonLink from '../ButtonLink';
import ButtonExternalLink from '../ButtonExternalLink';
import MessengerLink from '../MessengerLink';
import EventForm from './EventForm';
import './EventForm.css';

const EventFormView = ({ editMode, event, isAuth, onSave }) => {
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
      </div>
    </div>
  );
};

EventFormView.propTypes = {
  event: PropTypes.string.isRequired,
  editMode: PropTypes.bool,
  isAuth: PropTypes.bool,
  onSave: PropTypes.func.isRequired,
};

EventFormView.defaultProps = {
  editMode: true,
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
