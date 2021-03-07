import React from 'react';
import 'react-add-to-calendar/dist/react-add-to-calendar.css';
import { Link } from 'react-router-dom';
import './ServiceCard.css';

const ServiceCard = ({ service, highlightName }) => {
  const { isFree, price, name, service: typeOfService, id } = service;

  const ServiceContent = () => {
    let priceTag = null;

    if (isFree) {
      priceTag = <span className="serviceFree">бесплатно</span>;
    } else if (price) {
      priceTag = <span>от {price} руб.</span>;
    }

    if (highlightName) {
      return (
        <div>
          {name}
          <br />
          <small>
            {typeOfService}
            <span>&nbsp;</span>
            {priceTag}
          </small>
        </div>
      );
    }
    return (
      <div>
        {typeOfService}
        <span>&nbsp;</span>
        {priceTag}
        <br />
        <small>{name}</small>
      </div>
    );
  };

  return (
    <Link className="reset-link-style" to={`/service/${id}`}>
      <div className="border-top">
        <div className="container">
          <div className="service-item container-center">
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

export default ServiceCard;
