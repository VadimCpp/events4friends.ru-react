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
    <form className="new-service-view">
      <fieldset className="fieldset text">
        <label htmlFor="service">
          <span className="fieldset__legend">Название услуги:</span>
          <input
            id="service"
            type="text"
            name="service"
            value={service.service}
            onChange={handlerChange}
          />
        </label>
      </fieldset>

      <fieldset className="fieldset text">
        <label htmlFor="name">
          <span className="fieldset__legend">
            Имя того, кто оказывает услугу:
          </span>
          <input
            id="name"
            type="text"
            name="name"
            value={service.name}
            onChange={handlerChange}
          />
        </label>
      </fieldset>

      <fieldset className="fieldset radio">
        <legend className="fieldset__legend">Выберите сообщество:</legend>
        <CommunityChoice
          value={service.communityId}
          handleChange={handleCommunityChange}
        />
      </fieldset>

      <fieldset className="fieldset">
        <p className="fieldset__legend">Полное описание:</p>
        <div>
          <ReachTextEditor
            description={service.description}
            onChange={handlerDescriptionChange}
          />
        </div>
      </fieldset>

      <fieldset className="fieldset radio">
        <legend className="fieldset__legend">Услуга оказывается платно?</legend>
        <label htmlFor="is-free-yes">
          <input
            id="is-free-yes"
            type="radio"
            name="isFree"
            checked={!service.isFree}
            onChange={handleIsFreeChange}
          />
          <span className="text-left">Да</span>
        </label>
        <label htmlFor="is-free-no">
          <input
            id="is-free-no"
            type="radio"
            name="isFree"
            checked={service.isFree}
            onChange={handleIsFreeChange}
          />
          <span className="text-left">Нет</span>
        </label>
      </fieldset>

      {!service.isFree && (
        <fieldset className="fieldset text">
          <label htmlFor="price">
            <span className="fieldset__legend">
              Укажите стоимость услуги в рублях:
            </span>
            <input
              id="price"
              type="number"
              name="price"
              min="0"
              value={service.price}
              onChange={handlerChange}
              disabled={service.isFree}
            />
          </label>
        </fieldset>
      )}

      <fieldset className="fieldset text">
        <legend className="visually-hidden">Контактные данные</legend>
        <label htmlFor="site-link">
          <span className="fieldset__legend">Cсылка на сайт:</span>
          <input
            id="site-link"
            type="text"
            name="website"
            value={service.website}
            onChange={handlerChange}
          />
        </label>
      </fieldset>
      <fieldset className="fieldset text">
        <label htmlFor="insta-link">
          <span className="fieldset__legend">Ссылка на инстаграм:</span>
          <input
            id="insta-link"
            type="text"
            name="instagram"
            value={service.instagram}
            onChange={handlerChange}
          />
        </label>
      </fieldset>
      <fieldset className="fieldset text">
        <label htmlFor="whatsapp">
          <span className="fieldset__legend">
            Номер в WhatsApp в формате 7XXX1234567:
          </span>
          <input
            id="whatsapp"
            type="text"
            name="whatsapp"
            value={service.whatsapp}
            onChange={handlerChange}
          />
        </label>
      </fieldset>
      <fieldset className="fieldset text">
        <label htmlFor="telegram">
          <span className="fieldset__legend">ID пользователя в телеграм:</span>
          <input
            id="telegram"
            type="text"
            name="telegram"
            value={service.telegram}
            onChange={handlerChange}
          />
        </label>
      </fieldset>
      <fieldset className="fieldset text">
        <label htmlFor="vk-link">
          <span className="fieldset__legend">Ссылка ВКонтакте:</span>
          <input
            id="vk-link"
            type="text"
            name="vkontakte"
            value={service.vkontakte}
            onChange={handlerChange}
          />
        </label>
      </fieldset>

      <fieldset className="fieldset button">
        {updatingService ? (
          <p>Сохраняем услугу...</p>
        ) : (
          <Button onPress={saveHandler} icon="/icons/icon_save.svg">
            Сохранить
          </Button>
        )}
      </fieldset>
    </form>
  );
};

export default ServiceForm;
