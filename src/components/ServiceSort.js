import React from 'react';
import './ServiceSort.css';

let ServiceSort = (props) => {
    return (
        <div className="container service-sort">
            <span className="service-sort__label">Сортировка:</span>
            <button className="service-sort__button service-sort__button--disabled">Услуга</button>
            <button className="service-sort__button">Имя</button>
            <button className="service-sort__button">Цена</button>
        </div>
    )
}

export default ServiceSort;

