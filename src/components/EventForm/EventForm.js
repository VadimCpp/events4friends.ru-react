/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { ReachTextEditor } from '../RichTextEditor';
import Button from '../Button';
import { verify, eventInitState } from './helper';
import { copyObjectAndTrim } from '../../helper';
import CommunityChoice from '../CommunityChoice';

const EventForm = ({ defaultEvent, onSave = () => {} }) => {
  const history = useHistory();
  const [event, updateEventValue] = useState(eventInitState);
  const [updatingEvent, setUpdatingEvent] = useState(false);

  const timezone = {
    EET: '+0200', // https://www.timeanddate.com/time/zone/russia/kaliningrad
    MSC: '+0300',
  };

  useEffect(() => {
    if (defaultEvent.id || defaultEvent.contact) {
      updateEventValue({ ...eventInitState, ...defaultEvent });
    }
  }, [defaultEvent]);

  const saveHandler = e => {
    e.preventDefault();
    setUpdatingEvent(true);

    const saveEvent = copyObjectAndTrim(event);

    if (!verify(saveEvent)) {
      console.warn('verify fail');
      setUpdatingEvent(false);
      return;
    }

    onSave(saveEvent, docId => {
      if (docId) {
        console.info('Event updated successfully, open it');
        history.push(`/event/${docId}`);
      } else {
        setUpdatingEvent(false);
        alert(
          'Не удалось изменить событие. Пожалуйста, обратитесь в службу поддержки.',
        );
      }
    });
  };

  const handlerChange = key => ({ target }) => {
    const { value } = target;
    updateEventValue({ ...event, [key]: value });
  };

  const handlerDescriptionChange = val => {
    updateEventValue({ ...event, description: val });
  };

  const handleTimeZoneChange = aTimezone => {
    updateEventValue({ ...event, timezone: aTimezone });
  };

  const handleIsOnlineChange = value => () => {
    updateEventValue({ ...event, isOnline: value });
  };

  return (
    <form className="neweventview">
      <div className="textinput">
        <label>
          <span className="textinput__label-text--block text-left">
            Короткое название мероприятия:
          </span>
          <input
            className="textinput__input"
            type="text"
            name="summary"
            value={event.summary}
            onChange={handlerChange('summary')}
          />
        </label>
      </div>
      <div className="textinput">
        <p className="text-left">Полное описание:</p>
        <div className="rte-container">
          <ReachTextEditor
            description={event.description}
            onChange={handlerDescriptionChange}
          />
        </div>
      </div>
      <fieldset className="textinput">
        <legend className="textinput__legend">Где будет мероприятие?</legend>
        <label>
          <span className="text-left">Онлайн</span>
          <input
            className="textinput__input"
            type="radio"
            name="isOnline"
            checked={event.isOnline}
            onChange={handleIsOnlineChange(true)}
          />
        </label>
        <label>
          <span className="text-left">Офлайн</span>
          <input
            className="textinput__input"
            type="radio"
            name="isOnline"
            checked={!event.isOnline}
            onChange={handleIsOnlineChange(false)}
          />
        </label>
      </fieldset>
      <div className="textinput">
        <label>
          <span className="textinput__label-text--block text-left">
            {event.isOnline
              ? 'Ссылка онлайн мероприятия:'
              : 'Укажите адрес встречи:'}
          </span>
          <input
            className="textinput__input"
            type="text"
            name="location"
            value={event.location}
            onChange={handlerChange('location')}
          />
        </label>
      </div>
      <div className="textinput">
        <label>
          <span className="textinput__label-text--block text-left">
            Выберите сообщество:
          </span>
          <CommunityChoice
            value={event.communityId}
            handleChange={value =>
              updateEventValue({ ...event, communityId: value })
            }
          />
        </label>
      </div>
      <fieldset className="textinput">
        <legend className="textinput__legend">Часовая зона?</legend>
        <label>
          <span className="text-left">Калининград (GMT+2)</span>
          <input
            className="textinput__input"
            type="radio"
            name="timeZone"
            checked={event.timezone === timezone.EET}
            onChange={() => {
              handleTimeZoneChange(timezone.EET);
            }}
          />
        </label>
        <label>
          <span className="text-left">Москва (GMT+3)</span>
          <input
            className="textinput__input"
            type="radio"
            name="timeZone"
            checked={event.timezone === timezone.MSC}
            onChange={() => {
              handleTimeZoneChange(timezone.MSC);
            }}
          />
        </label>
      </fieldset>
      <div className="textinput">
        <label>
          <span className="textinput__label-text--block text-left">
            Начало мероприятия:
          </span>
          <input
            className="textinput__input"
            type="datetime-local"
            name="start"
            value={event.start}
            onChange={handlerChange('start')}
          />
        </label>
      </div>
      <div className="textinput">
        <label>
          <span className="textinput__label-text--block text-left">
            Окончание мероприятия (необязательно):
          </span>
          <input
            className="textinput__input"
            type="datetime-local"
            name="end"
            value={event.end}
            onChange={handlerChange('end')}
          />
        </label>
      </div>
      <div className="textinput">
        <label>
          <span className="textinput__label-text--block text-left">
            Контакт организатора:
          </span>
          <input
            className="textinput__input"
            type="text"
            name="contact"
            onChange={handlerChange('contact')}
            value={event.contact}
            disabled
          />
        </label>
      </div>
      <div className="textinput">
        <label>
          <span className="textinput__label-text--block text-left">
            Имя организатора:
          </span>
          <input
            className="textinput__input"
            type="text"
            name="name"
            value={event.name}
            onChange={handlerChange('name')}
          />
        </label>
      </div>
      {updatingEvent ? (
        <p>Сохраняем событие...</p>
      ) : (
        <Button onPress={saveHandler} icon="/icons/icon_save.svg">
          Сохранить
        </Button>
      )}
    </form>
  );
};

export default EventForm;
