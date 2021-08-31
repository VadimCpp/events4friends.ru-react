/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect, useCallback } from 'react';
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

  const handleCommunityChange = useCallback(
    value => updateEventValue({ ...event, communityId: value }),
    [updateEventValue, event],
  );

  return (
    <form className="neweventview">
      <div className="textinput text">
        <label>
          <span className="textinput__legend">
            Короткое название мероприятия:
          </span>
          <input
            type="text"
            name="summary"
            value={event.summary}
            onChange={handlerChange('summary')}
          />
        </label>
      </div>
      <div className="textinput">
        <p className="textinput__legend">Полное описание:</p>
        <div className="rte-container">
          <ReachTextEditor
            description={event.description}
            onChange={handlerDescriptionChange}
          />
        </div>
      </div>
      <fieldset className="textinput radio">
        <legend className="textinput__legend">Где будет мероприятие?</legend>
        <label>
          <input
            className="textinput"
            type="radio"
            name="isOnline"
            checked={event.isOnline}
            onChange={handleIsOnlineChange(true)}
          />
          <span className="text-left">Онлайн</span>
        </label>
        <label>
          <input
            className="textinput"
            type="radio"
            name="isOnline"
            checked={!event.isOnline}
            onChange={handleIsOnlineChange(false)}
          />
          <span className="text-left">Офлайн</span>
        </label>
      </fieldset>
      <fieldset className="textinput text">
        <label>
          <span className="textinput__legend">
            {event.isOnline
              ? 'Ссылка онлайн мероприятия:'
              : 'Укажите адрес встречи:'}
          </span>
          <input
            type="text"
            name="location"
            value={event.location}
            onChange={handlerChange('location')}
          />
        </label>
      </fieldset>
      <fieldset className="textinput radio">
        <legend className="textinput__legend">Выберите сообщество:</legend>
        <CommunityChoice
          value={event.communityId}
          handleChange={handleCommunityChange}
        />
      </fieldset>
      <fieldset className="textinput radio">
        <legend className="textinput__legend">Часовая зона?</legend>
        <label>
          <input
            className="textinput"
            type="radio"
            name="timeZone"
            checked={event.timezone === timezone.EET}
            onChange={() => {
              handleTimeZoneChange(timezone.EET);
            }}
          />
          <span className="text-left">Калининград (GMT+2)</span>
        </label>
        <label>
          <input
            className="textinput"
            type="radio"
            name="timeZone"
            checked={event.timezone === timezone.MSC}
            onChange={() => {
              handleTimeZoneChange(timezone.MSC);
            }}
          />
          <span className="text-left">Москва (GMT+3)</span>
        </label>
      </fieldset>
      <fieldset className="textinput date">
        <label>
          <span className="textinput__legend">Начало мероприятия:</span>
          <input
            type="datetime-local"
            name="start"
            value={event.start}
            onChange={handlerChange('start')}
          />
        </label>
      </fieldset>
      <fieldset className="textinput date">
        <label>
          <span className="textinput__legend">
            Окончание мероприятия (необязательно):
          </span>
          <input
            type="datetime-local"
            name="end"
            value={event.end}
            onChange={handlerChange('end')}
          />
        </label>
      </fieldset>
      <fieldset className="textinput text">
        <label>
          <span className="textinput__legend">Контакт организатора:</span>
          <input
            type="text"
            name="contact"
            onChange={handlerChange('contact')}
            value={event.contact}
            disabled
          />
        </label>
      </fieldset>
      <fieldset className="textinput text">
        <label>
          <span className="textinput__legend">Имя организатора:</span>
          <input
            type="text"
            name="name"
            value={event.name}
            onChange={handlerChange('name')}
          />
        </label>
      </fieldset>
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
