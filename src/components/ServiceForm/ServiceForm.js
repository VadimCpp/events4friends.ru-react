import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { verify, serviceInitState } from './helper';

import { ReachTextEditor } from '../RichTextEditor';
import Button from '../Button';

const ServiceForm = ({ defaultService, onSave = () => {} }) => {
  const [service, setService] = useState(serviceInitState);
  const [updatingService, setUpdatingService] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (defaultService) {
      setService({ ...serviceInitState, ...defaultService });
    }
  }, [defaultService]);

  const saveHandler = () => {
    setUpdatingService(true);

    if (!verify(service)) {
      console.warn('verify fail');
      setUpdatingService(false);
      return;
    }

    onSave(service, docId => {
      if (docId) {
        console.info('Service updated successfully, open it');
        history.push(`/service/${docId}`);
      } else {
        setUpdatingService(false);
        alert(
          'Не удалось изменить услугу. Пожалуйста, обратитесь в службу поддержки.',
        );
      }
    });
  };

  const handlerChange = e => {
    const { name, value } = e.currentTarget;
    setService(prev => ({ ...prev, [name]: value }));
  };

  const handlerDescriptionChange = useCallback(val => {
    setService(prev => ({ ...prev, description: val }));
  }, []);

  const handleIsFreeChange = () => {
    const { isFree } = service;
    if (isFree === true) {
      setService(prev => ({ ...prev, isFree: false }));
    } else {
      setService(prev => ({ ...prev, price: '', isFree: true }));
    }
  };

  return (
    <div className="newserviceview">
      <div className="textinput">
        <label>
          <p className="text-left">Название услуги:</p>
          <input
            className="textinput__input"
            type="text"
            name="service"
            value={service.service}
            onChange={handlerChange}
          />
        </label>
      </div>

      <div className="textinput">
        <label>
          <p className="text-left">Имя того, кто оказывает услугу:</p>
          <input
            className="textinput__input"
            type="text"
            name="name"
            value={service.name}
            onChange={handlerChange}
          />
        </label>
      </div>

      <div className="textinput">
        <p className="text-left">Полное описание:</p>
        <div className="rte-container">
          <ReachTextEditor
            description={service.description}
            onChange={handlerDescriptionChange}
          />
        </div>
      </div>

      <div className="textinput">
        <p className="text-left">Услуга оказывается платно?</p>
        <p>
          <label>
            <span className="text-left">Да</span>
            <input
              className="textinput__input"
              type="radio"
              name="isFree"
              checked={!service.isFree}
              onChange={handleIsFreeChange}
            />
          </label>
        </p>
        <p>
          <label>
            <span className="text-left">Нет</span>
            <input
              className="textinput__input"
              type="radio"
              name="isFree"
              checked={service.isFree}
              onChange={handleIsFreeChange}
            />
          </label>
        </p>
      </div>
      <>
        {!service.isFree && (
          <div className="textinput">
            <label>
              <p className="text-left">Укажите стоимость услуги в рублях:</p>
              <input
                className="textinput__input"
                type="text"
                name="price"
                value={service.price}
                onChange={handlerChange}
                disabled={service.isFree}
              />
            </label>
          </div>
        )}
      </>

      <div className="textinput">
        <label>
          <p className="text-left">Cсылка на сайт:</p>
          <input
            className="textinput__input"
            type="text"
            name="website"
            value={service.website}
            onChange={handlerChange}
          />
        </label>
      </div>

      <div className="textinput">
        <label>
          <p className="text-left">Ссылка на инстаграм:</p>
          <input
            className="textinput__input"
            type="text"
            name="instagram"
            value={service.instagram}
            onChange={handlerChange}
          />
        </label>
      </div>

      <div className="textinput">
        <label>
          <p className="text-left">Номер в WhatsApp в формате 7XXX1234567:</p>
          <input
            className="textinput__input"
            type="text"
            name="whatsapp"
            value={service.whatsapp}
            onChange={handlerChange}
          />
        </label>
      </div>

      <div className="textinput">
        <label>
          <p className="text-left">ID пользователя в телеграм:</p>
          <input
            className="textinput__input"
            type="text"
            name="telegram"
            value={service.telegram}
            onChange={handlerChange}
          />
        </label>
      </div>

      <div className="textinput">
        <label>
          <p className="text-left">Ссылка ВКонтакте:</p>
          <input
            className="textinput__input"
            type="text"
            name="vkontakte"
            value={service.vkontakte}
            onChange={handlerChange}
          />
        </label>
      </div>

      {updatingService ? (
        <div>
          <p>Сохраняем услугу...</p>
        </div>
      ) : (
        <Button onPress={saveHandler} icon="/icons/icon_save.svg">
          Сохранить
        </Button>
      )}
    </div>
  );
};

export default ServiceForm;
