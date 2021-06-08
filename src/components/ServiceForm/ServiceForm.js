import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { verify, serviceInitState, normalizePrice } from './helper';

import { ReachTextEditor } from '../RichTextEditor';
import Button from '../Button';
import { copyObjectAndTrim } from '../../helper';
import CommunityChoice from '../CommunityChoice';

const ServiceForm = ({ defaultService, onSave = () => {} }) => {
  const [service, setService] = useState(serviceInitState);
  const [updatingService, setUpdatingService] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (defaultService) {
      setService({ ...serviceInitState, ...defaultService });
    }
  }, [defaultService]);

  const saveHandler = e => {
    e.preventDefault();
    setUpdatingService(true);

    const saveService = copyObjectAndTrim(service);

    if (!verify(saveService)) {
      console.warn('verify fail');
      setUpdatingService(false);
      return;
    }

    onSave(saveService, docId => {
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
    const { name } = e.currentTarget;
    let { value } = e.currentTarget;
    if (name === 'price') {
      value = normalizePrice(value);
    }
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

  const handleCommunityChange = useCallback(
    value => setService({ ...service, communityId: value }),
    [setService, service],
  );

  return (
    <form className="newserviceview">
      <div className="textinput">
        <label htmlFor="service">
          <span className="textinput__label-text--block text-left">
            Название услуги:
          </span>
          <input
            id="service"
            className="textinput__input"
            type="text"
            name="service"
            value={service.service}
            onChange={handlerChange}
          />
        </label>
      </div>

      <div className="textinput">
        <label htmlFor="name">
          <span className="textinput__label-text--block">
            Имя того, кто оказывает услугу:
          </span>
          <input
            id="name"
            className="textinput__input"
            type="text"
            name="name"
            value={service.name}
            onChange={handlerChange}
          />
        </label>
      </div>

      <div className="textinput">
        <span className="textinput__label-text--block text-left">
          Выберите сообщество:
        </span>
        <CommunityChoice
          value={service.communityId}
          handleChange={handleCommunityChange}
        />
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

      <fieldset className="textinput">
        <legend className="textinput__legend">
          Услуга оказывается платно?
        </legend>
        <label htmlFor="is-free-yes">
          <span className="text-left">Да</span>
          <input
            id="is-free-yes"
            className="textinput__input"
            type="radio"
            name="isFree"
            checked={!service.isFree}
            onChange={handleIsFreeChange}
          />
        </label>
        <label htmlFor="is-free-no">
          <span className="text-left">Нет</span>
          <input
            id="is-free-no"
            className="textinput__input"
            type="radio"
            name="isFree"
            checked={service.isFree}
            onChange={handleIsFreeChange}
          />
        </label>
      </fieldset>

      {!service.isFree && (
        <div className="textinput">
          <label htmlFor="price">
            <span className="textinput__label-text--block text-left">
              Укажите стоимость услуги в рублях:
            </span>
            <input
              id="price"
              className="textinput__input"
              type="number"
              name="price"
              min="0"
              value={service.price}
              onChange={handlerChange}
              disabled={service.isFree}
            />
          </label>
        </div>
      )}

      <fieldset className="service-form__contacts textinput">
        <legend className="visually-hidden">Контактные данные</legend>
        <label className="service-form__label" htmlFor="site-link">
          <span className="textinput__label-text--block text-left">
            Cсылка на сайт:
          </span>
          <input
            id="site-link"
            className="textinput__input"
            type="text"
            name="website"
            value={service.website}
            onChange={handlerChange}
          />
        </label>
        <label className="service-form__label" htmlFor="insta-link">
          <span className="textinput__label-text--block text-left">
            Ссылка на инстаграм:
          </span>
          <input
            id="insta-link"
            className="textinput__input"
            type="text"
            name="instagram"
            value={service.instagram}
            onChange={handlerChange}
          />
        </label>
        <label className="service-form__label" htmlFor="whatsapp">
          <span className="textinput__label-text--block text-left">
            Номер в WhatsApp в формате 7XXX1234567:
          </span>
          <input
            id="whatsapp"
            className="textinput__input"
            type="text"
            name="whatsapp"
            value={service.whatsapp}
            onChange={handlerChange}
          />
        </label>
        <label className="service-form__label" htmlFor="telegram">
          <span className="textinput__label-text--block text-left">
            ID пользователя в телеграм:
          </span>
          <input
            id="telegram"
            className="textinput__input"
            type="text"
            name="telegram"
            value={service.telegram}
            onChange={handlerChange}
          />
        </label>
        <label className="service-form__label" htmlFor="vk-link">
          <span className="textinput__label-text--block text-left">
            Ссылка ВКонтакте:
          </span>
          <input
            id="vk-link"
            className="textinput__input"
            type="text"
            name="vkontakte"
            value={service.vkontakte}
            onChange={handlerChange}
          />
        </label>
      </fieldset>

      {updatingService ? (
        <p>Сохраняем услугу...</p>
      ) : (
        <Button onPress={saveHandler} icon="/icons/icon_save.svg">
          Сохранить
        </Button>
      )}
    </form>
  );
};

export default ServiceForm;
