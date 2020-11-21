import React from 'react';
import ButtonLink from '../ButtonLink';
import ButtonExternalLink from '../ButtonExternalLink';
import ServiceForm from './ServiceForm';
import './ServiceForm.css';

const ServiceFormView = ({ service, isAuth, onSave = () => {} }) => {
  const formContent = isAuth ? (
    <ServiceForm defaultService={service} onSave={onSave} />
  ) : (
    <div>
      <p>Для того, чтобы редактировать услуги, выполните вход</p>
    </div>
  );

  return (
    <div>
      <div>
        <ButtonLink
          to="/services"
          icon="/icons/icon_arrow_back.svg"
          title="К списку"
          className="serviceFormView-arrowBack-btn"
        />
      </div>

      {formContent}

      <div className="border-top">
        <div className="container container-center pt-4 pb-5">
          <p>
            У вас есть вопросы о том, как редактировать услугу? Задайте вопрос в
            чате:
          </p>
          <ButtonExternalLink
            href="tg://resolve?domain=events4friends"
            icon="/icons/telegram.svg"
            alt="telegram"
            className="external_link_btn telegram_btn"
          />
          <ButtonExternalLink
            href="https://chat.whatsapp.com/DWUaZ1bsuxwJLALyvBYTt8"
            icon="/icons/whatsapp.svg"
            alt="whatsapp"
            className="external_link_btn whatsapp_btn"
          />
          <ButtonExternalLink
            href="https://invite.viber.com/?g2=AQBA7jF9Y7%2BXBkqTI0PoYF%2BmnEMluxPdGZy8wJQ3PRPBLT%2BMeh344RxBuBUTVc6B"
            icon="/icons/viber.svg"
            alt="viber"
            className="external_link_btn viber_btn"
          />
        </div>
      </div>
    </div>
  );
};

export default React.memo(ServiceFormView, (prev, next) => {
  if (prev.service.id !== next.service.id) {
    return false;
  }

  if (prev.service.contact !== next.service.contact) {
    return false;
  }

  if (prev.isAuth !== next.isAuth) {
    return false;
  }

  return true;
});
