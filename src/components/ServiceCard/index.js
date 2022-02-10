import React from 'react';
import { Link } from 'react-router-dom';
import './ServiceCard.css';

const ServiceCard = ({ service, highlightName }) => {
  const { isFree, price, name, service: typeOfService, id, img } = service;

  let priceTag = null;
  if (isFree) {
    priceTag = <span className="serviceFree">бесплатно</span>;
  } else if (price) {
    priceTag = <span>от {price} руб.</span>;
  }

  const Image = () => {
    if (img) {
      return (
        <img
          className="service__img"
          src={img}
          width="267"
          height="144"
          alt={typeOfService}
        />
      );
    }
    return '';
  };

  const Title = () => {
    if (highlightName) {
      return <h3 className="service__title">{name}</h3>;
    }
    return (
      <h3 className="service__title">
        {typeOfService}&nbsp;{priceTag}
      </h3>
    );
  };

  const Text = () => {
    if (highlightName) {
      return (
        <p className="service__text">
          {typeOfService}&nbsp;{priceTag}
        </p>
      );
    }
    return <p className="service__text">{name}</p>;
  };

  return (
    <li className="service">
      <Title />
      <Image />
      <Text />
      <Link className="service__link" to={`/service/${id}`}>
        Подробнее
      </Link>
    </li>
  );
};

export default ServiceCard;
