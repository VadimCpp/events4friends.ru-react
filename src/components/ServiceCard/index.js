import React, { useEffect } from 'react';
import moment from 'moment';
import 'react-add-to-calendar/dist/react-add-to-calendar.css';
import { Link, withRouter } from 'react-router-dom';
import './ServiceCard.css';

const ServiceCard = ({ service, highlightName }) => {
  useEffect(() => {
    moment.locale('ru');
  }, []);

  const ServiceContent = () => {
    let priceTag = null;

    if (service.isFree) {
      priceTag = <span className="serviceFree">бесплатно</span>;
    } else if (service.price) {
      priceTag = <span>от {service.price} руб.</span>;
    }

    if (highlightName) {
      return (
        <div>
          {service.name}
          <br />
          <small>
            {service.service}
            <span>&nbsp;</span>
            {priceTag}
          </small>
        </div>
      );
    }
    return (
      <div>
        {service.service}
        <span>&nbsp;</span>
        {priceTag}
        <br />
        <small>{service.name}</small>
      </div>
    );
  };

  return (
    <Link className="reset-link-style" to={`/service/${service.id}`}>
      <div className="border-top">
        <div className="container">
          <div className="event-item container-center">
            <div className="d-flex align-items-center justify-content-between">
              <ServiceContent />
              <div className="button">
                <img
                  src="/icons/icon_arrow_forward.svg"
                  alt="➡️"
                  className="service-button__image"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default withRouter(ServiceCard);
