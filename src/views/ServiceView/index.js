/* eslint-disable max-len */
/* eslint-disable indent */
import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { DataContext } from '../../context/DataContext';
import { AuthContext } from '../../context/AuthContext';
import ButtonLink from '../../components/ButtonLink';
import ButtonExternalLink from '../../components/ButtonExternalLink';
import Button from '../../components/Button';
import './ServiceView.css';

const ServiceView = ({ match }) => {
  const [deletingInProgress, setDeletingInProgress] = useState(false);

  const serviceId = match.params.id;
  const authContext = useContext(AuthContext);
  const dataContext = useContext(DataContext);
  const history = useHistory();

  const { user, connectingToFirebase } = authContext;
  const { services, loadingServices, deleteService } = dataContext;

  let service = null;
  for (let i = 0; i < services.length; i++) {
    if (services[i].id === serviceId) {
      service = services[i];
      break;
    }
  }

  const isAbleToDeleteOrEdit =
    !deletingInProgress && user && service && user.email === service.contact;

  const onPressDeleteService = () => {
    if (window.confirm('Вы уверены, что хотите удалить услугу?')) {
      setDeletingInProgress(true);
      deleteService(service.id, success => {
        if (success) {
          console.info('Service deleted successfully, navigate to list view');
          history.push('/services');
        } else {
          console.info('Failed to delete service');
          setDeletingInProgress(false);
        }
      });
    }
  };

  return (
    <div>
      <div>
        <ButtonLink
          className="arrow-back-btn"
          to="/services"
          icon="/icons/icon_arrow_back.svg"
          title="К списку"
        />
      </div>
      {isAbleToDeleteOrEdit && (
        <div className="controls">
          <Button
            onPress={onPressDeleteService}
            icon="/icons/icon_delete.svg"
            classList={['button-link', 'service-view']}
          >
            Удалить
          </Button>
          <ButtonLink
            to={`/editservice/${service.id}`}
            icon="/icons/icon_edit.svg"
            title="Изменить"
            classList={['button-link', 'service-view']}
          />
        </div>
      )}
      <div className="border-top">
        <div className="container">
          <div className="service-item container-center">
            {!service && connectingToFirebase && (
              <p align="center">Подключаемся к базе данных...</p>
            )}
            {!service && !connectingToFirebase && loadingServices && (
              <p align="center">Загружаем услугу...</p>
            )}
            {!service && !connectingToFirebase && !loadingServices && (
              <div>
                <p align="center">
                  Услуга недоступна{' '}
                  <span role="img" aria-label="sad">
                    🙁
                  </span>
                </p>
                <p align="center">Попробуйте перезагрузить страницу</p>
              </div>
            )}
            {service && (
              <div>
                <h2>
                  {service.service || 'Не указано'}
                  {service.isFree ? (
                    <span className="text-success"> (бесплатно)</span>
                  ) : (
                    <>
                      {service.price && <span> от {service.price} руб.</span>}
                    </>
                  )}
                </h2>
                <p
                  dangerouslySetInnerHTML={{
                    __html: service.description,
                  }}
                />
                <p>
                  <span>Предоставляет услугу: </span>
                  <strong>{service.name || 'Не указано'}</strong>
                </p>
                <p>Контакты:</p>
                {service.instagram && (
                  <p>
                    Instagram:{' '}
                    <a href={service.instagram}>{service.instagram}</a>
                  </p>
                )}
                {service.website && (
                  <p>
                    Сайт: <a href={service.website}>{service.website}</a>
                  </p>
                )}
                {service.vkontakte && (
                  <p>
                    ВКонтакте:{' '}
                    <a href={service.vkontakte}>{service.vkontakte}</a>
                  </p>
                )}
                {service.telegram && (
                  <p>
                    <ButtonExternalLink
                      href={`tg://resolve?domain=${service.telegram}`}
                      icon="/icons/telegram.svg"
                      alt="telegram"
                      style={{
                        borderColor: '#139BD0',
                        margin: 8,
                        borderRadius: '48px',
                      }}
                      title={service.telegram}
                    />
                  </p>
                )}
                {service.whatsapp && (
                  <p>
                    <ButtonExternalLink
                      href={`https://wa.me/${service.whatsapp}?text=${encodeURI(
                        `Привет, меня интересует услуга ${service.service}, которую я нашел на сайте events4friends.ru`,
                      )}`}
                      icon="/icons/whatsapp.svg"
                      alt="whatsapp"
                      style={{
                        borderColor: '#57BB63',
                        margin: 8,
                        borderRadius: '48px',
                      }}
                      title={service.whatsapp}
                    />
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="border-top">
        <div className="container container-center pt-4 pb-5">
          <p>Обсудить услугу в чате:</p>
          <ButtonExternalLink
            href="tg://resolve?domain=events4friends"
            icon="/icons/telegram.svg"
            alt="telegram"
            style={{
              borderColor: '#139BD0',
              margin: 8,
              borderRadius: '48px',
            }}
          />
          <ButtonExternalLink
            href="https://chat.whatsapp.com/DWUaZ1bsuxwJLALyvBYTt8"
            icon="/icons/whatsapp.svg"
            alt="whatsapp"
            style={{
              borderColor: '#57BB63',
              margin: 8,
              borderRadius: '48px',
            }}
          />
          <ButtonExternalLink
            href="https://invite.viber.com/?g2=AQBA7jF9Y7%2BXBkqTI0PoYF%2BmnEMluxPdGZy8wJQ3PRPBLT%2BMeh344RxBuBUTVc6B"
            icon="/icons/viber.svg"
            alt="viber"
            style={{
              borderColor: '#7C519B',
              margin: 8,
              borderRadius: '48px',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ServiceView;
