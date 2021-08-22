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
import MessengerLink from '../../components/MessengerLink';

const ServiceView = ({ match }) => {
  const [deletingInProgress, setDeletingInProgress] = useState(false);

  const { slug, id: serviceId } = match.params;
  const history = useHistory();

  const { user, connectingToFirebase } = useContext(AuthContext);
  const { services, loadingServices, deleteService } = useContext(DataContext);

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

  const backLinkTo = slug ? `/${slug}/services` : '/services';
  return (
    <div>
      <div>
        <ButtonLink
          className="btn-back"
          to={backLinkTo}
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
                    <MessengerLink
                      ExternalLinkComponent={ButtonExternalLink}
                      messengerName="telegram"
                      href={`tg://resolve?domain=${service.telegram}`}
                      title={service.telegram}
                    />
                  </p>
                )}
                {service.whatsapp && (
                  <p>
                    <MessengerLink
                      ExternalLinkComponent={ButtonExternalLink}
                      messengerName="whatsapp"
                      href={`https://wa.me/${service.whatsapp}?text=${encodeURI(
                        `Привет, меня интересует услуга ${service.service}, которую я нашел на сайте events4friends.ru`,
                      )}`}
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

export default ServiceView;
