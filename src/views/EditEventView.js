/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import Button from '../components/Button';
import ButtonLink from '../components/ButtonLink';
import ButtonExternalLink from '../components/ButtonExternalLink';
import { AuthContext } from '../context/AuthContext';
import { DataContext } from '../context/DataContext';
import { ReachTextEditor } from '../components/RichTextEditor';
import './EditEventView.css';

const EditEventView = ({ match, history }) => {
  const [state, setState] = useState({
    summary: '',
    description: '',
    isOnline: true,
    location: '',
    timezone: '+0200',
    start: '',
    end: '',
    name: '',
    id: '',
    updatingEvent: false,
  });
  const authContext = useContext(AuthContext);
  const dataContext = useContext(DataContext);

  const handleSummaryChange = e => {
    setState({ ...state, summary: e.target.value });
  };

  const handleDescriptionChange = value => {
    setState({ ...state, description: value });
  };

  const handleIsOnlineChange = () => {
    setState({ ...state, isOnline: true });
  };

  const handleIsOfflineChange = () => {
    setState({ ...state, isOnline: false });
  };

  const handleTimeZoneChange = zone => {
    setState({ ...state, timezone: zone });
  };

  const handleLocationChange = e => {
    setState({ ...state, location: e.target.value });
  };

  const handleStartChange = e => {
    setState({ ...state, start: e.target.value });
  };

  const handleEndChange = e => {
    setState({ ...state, end: e.target.value });
  };

  const handleNameChange = e => {
    setState({ ...state, name: e.target.value });
  };

  const editEventForUser = (user, editEvent) => {
    const {
      summary,
      description,
      isOnline,
      location,
      timezone,
      start,
      end,
      name,
      id,
    } = state;

    //
    // NOTE!
    // First verify all the data
    //
    let verified = true;

    if (!summary) {
      verified = false;
      alert('Пожалуйста, введите название мероприятия');
    } else if (!description) {
      verified = false;
      alert('Пожалуйста, введите полное описание мероприятия');
    } else if (!location) {
      verified = false;
      alert('Пожалуйста, введите место проведения мероприятия');
    } else if (!start) {
      verified = false;
      alert('Пожалуйста, укажите время начала мероприятия');
    } else if (!name) {
      verified = false;
      alert('Пожалуйста, укажите имя организатора');
    }

    if (verified) {
      if (user && user.email) {
        const event = {
          summary,
          description,
          isOnline,
          location,
          contact: user.email,
          name,
          timezone,
          start,
          end,
        };
        editEvent(event, id, aSuccess => {
          if (aSuccess) {
            console.info('Event updated successfully, open it');
            history.push(`/event/${id}`);
          } else {
            setState({ ...state, updatingEvent: false });
            alert(
              'Не удалось изменить событие. Пожалуйста, обратитесь в службу поддержки.',
            );
          }
        });
      } else {
        alert(
          'Извините, невозможно изменить мероприятие. Обратитесь в техподдержку.',
        );
        console.warn('Error user data, skip');
      }
    } else {
      console.warn('Error verify data, skip');
    }
  };

  const {
    summary,
    description,
    isOnline,
    location,
    timezone,
    start,
    end,
    name,
    updatingEvent,
    id,
  } = state;

  let userAuthorized = false;
  const { user } = authContext;
  if (user) {
    const { isAnonymous } = user;
    if (isAnonymous === false) {
      userAuthorized = true;
    }
  }

  const { events, editEvent } = dataContext;
  const eventId = match.params.id;
  let event = null;
  // TODO: исправить обновление state в render

  for (let i = 0; i < events.length; i++) {
    if (eventId === events[i].id) {
      event = events[i];
      if (event.id !== id) {
        setState({
          ...state,
          summary: event.summary,
          description: event.description,
          isOnline: event.isOnline,
          location: event.location,
          timezone: event.timezone,
          start: event.start,
          end: event.end,
          name: event.name,
          id: event.id,
        });
      }
      break;
    }
  }

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
      {userAuthorized ? (
        <>
          {event ? (
            <div className="neweventview">
              <div className="textinput">
                <label>
                  <p className="text-left">Короткое название мероприятия:</p>
                  <input
                    className="textinput__input"
                    type="text"
                    name="summary"
                    value={summary}
                    onChange={handleSummaryChange}
                  />
                </label>
              </div>
              <div className="textinput">
                <p className="text-left">Полное описание:</p>
                <div className="rte-container">
                  <ReachTextEditor
                    onChange={handleDescriptionChange}
                    description={description}
                  />
                </div>
              </div>
              <div className="textinput">
                <p className="text-left">Где будет мероприятие?</p>
                <p>
                  <label>
                    <span className="text-left">Онлайн</span>
                    <input
                      className="textinput__input"
                      type="radio"
                      name="isOnline"
                      checked={isOnline}
                      onChange={handleIsOnlineChange}
                    />
                  </label>
                </p>
                <p>
                  <label>
                    <span className="text-left">Офлайн</span>
                    <input
                      className="textinput__input"
                      type="radio"
                      name="isOnline"
                      checked={!isOnline}
                      onChange={handleIsOfflineChange}
                    />
                  </label>
                </p>
              </div>
              <div className="textinput">
                <label>
                  <p className="text-left">
                    {isOnline
                      ? 'Ссылка онлайн мероприятия:'
                      : 'Укажите адрес встречи:'}
                  </p>
                  <input
                    className="textinput__input"
                    type="text"
                    name="location"
                    value={location}
                    onChange={handleLocationChange}
                  />
                </label>
              </div>
              <div className="textinput">
                <p className="text-left">Часовая зона?</p>
                <p>
                  <label>
                    <span className="text-left">Калининград (GMT+2)</span>
                    <input
                      className="textinput__input"
                      type="radio"
                      name="timeZone"
                      checked={timezone === '+0200'}
                      onChange={() => {
                        handleTimeZoneChange('+0200');
                      }}
                    />
                  </label>
                </p>
                <p>
                  <label>
                    <span className="text-left">Москва (GMT+3)</span>
                    <input
                      className="textinput__input"
                      type="radio"
                      name="timeZone"
                      checked={timezone === '+0300'}
                      onChange={() => {
                        handleTimeZoneChange('+0300');
                      }}
                    />
                  </label>
                </p>
              </div>
              <div className="textinput">
                <label>
                  <p className="text-left">Начало мероприятия:</p>
                  <input
                    className="textinput__input"
                    type="datetime-local"
                    name="start"
                    value={start}
                    onChange={handleStartChange}
                  />
                </label>
              </div>
              <div className="textinput">
                <label>
                  <p className="text-left">
                    Окончание мероприятия (необязательно):
                  </p>
                  <input
                    className="textinput__input"
                    type="datetime-local"
                    name="end"
                    value={end}
                    onChange={handleEndChange}
                  />
                </label>
              </div>
              <div className="textinput">
                <label>
                  <p className="text-left">Контакт организатора:</p>
                  <input
                    className="textinput__input"
                    type="text"
                    name="contact"
                    value={user.email}
                    disabled
                  />
                </label>
              </div>
              <div className="textinput">
                <label>
                  <p className="text-left">Имя организатора:</p>
                  <input
                    className="textinput__input"
                    type="text"
                    name="name"
                    value={name}
                    onChange={handleNameChange}
                  />
                </label>
              </div>
              {updatingEvent ? (
                <div>
                  <p>Сохраняем событие...</p>
                </div>
              ) : (
                <Button
                  onPress={() => {
                    setState({ ...state, updatingEvent: true }, () => {
                      editEventForUser(user, editEvent);
                    });
                  }}
                  icon="/icons/icon_save.svg"
                >
                  Сохранить
                </Button>
              )}
            </div>
          ) : (
            <div>
              <p>
                Событие не найдено, возможно оно удалено. Рекомендуем вернуться
                к списку анонсов и выбрать мероприятие еще раз.
              </p>
            </div>
          )}
        </>
      ) : (
        <div>
          <p>Для того, чтобы редактировать мероприятия, выполните вход</p>
        </div>
      )}
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

export default withRouter(EditEventView);
