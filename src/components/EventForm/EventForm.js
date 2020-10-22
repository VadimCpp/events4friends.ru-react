/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { ReachTextEditor } from '../RichTextEditor';
import Button from '../Button';
import { verify, eventInitState } from './helper';

const EventForm = ({ defaultEvent, onSave = () => {} }) => {
  const history = useHistory();
  const [event, updateEventValue] = useState(eventInitState);
  const [updatingEvent, setUpdatingEvent] = useState(false);

  useEffect(() => {
    if (defaultEvent.id || defaultEvent.contact) {
      updateEventValue({ ...eventInitState, ...defaultEvent });
    }
  }, [defaultEvent]);

  const saveHandler = () => {
    setUpdatingEvent(true);

    if (!verify(event)) {
      console.warn('verify fail');
      setUpdatingEvent(false);
      return;
    }

    onSave(event, docId => {
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

  const handleTimeZoneChange = timezone => {
    updateEventValue({ ...event, timezone });
  };

  const handleIsOnlineChange = value => () => {
    updateEventValue({ ...event, isOnline: value });
  };

  return (
    <div className="neweventview">
      <div className="textinput">
        <label>
          <p className="text-left">Короткое название мероприятия:</p>
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
      <div className="textinput">
        <p className="text-left">Где будет мероприятие?</p>
        <p>
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
        </p>
        <p>
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
        </p>
      </div>
      <div className="textinput">
        <label>
          <p className="text-left">
            {event.isOnline
              ? 'Ссылка онлайн мероприятия:'
              : 'Укажите адрес встречи:'}
          </p>
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
        <p className="text-left">Часовая зона?</p>
        <p>
          <label>
            <span className="text-left">Калининград (GMT+2)</span>
            <input
              className="textinput__input"
              type="radio"
              name="timeZone"
              checked={event.timezone === '+0200'}
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
              checked={event.timezone === '+0300'}
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
            value={event.start}
            onChange={handlerChange('start')}
          />
        </label>
      </div>
      <div className="textinput">
        <label>
          <p className="text-left">Окончание мероприятия (необязательно):</p>
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
          <p className="text-left">Контакт организатора:</p>
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
          <p className="text-left">Имя организатора:</p>
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
        <div>
          <p>Сохраняем событие...</p>
        </div>
      ) : (
        <Button onPress={saveHandler} icon="/icons/icon_save.svg">
          Сохранить
        </Button>
      )}
    </div>
  );
};

export default EventForm;
