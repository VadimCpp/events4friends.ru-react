import React from 'react';
import './ServiceSort.css';

const ServiceSort = props => {
  const {
    sortType,
    sortByName,
    sortByPrice,
    sortByService,
    onSortTypeChange,
  } = props;

  return (
    <div className="container service-sort">
      <span className="service-sort__label">Сортировка:</span>
      <button
        type="button"
        className={
          sortType === sortByService
            ? 'service-sort__button service-sort__button--disabled'
            : 'service-sort__button'
        }
        onClick={() =>
          sortType !== sortByService && onSortTypeChange
            ? onSortTypeChange(sortByService)
            : false
        }
      >
        Услуга
      </button>
      <button
        type="button"
        className={
          sortType === sortByName
            ? 'service-sort__button service-sort__button--disabled'
            : 'service-sort__button'
        }
        onClick={() =>
          sortType !== sortByName && onSortTypeChange
            ? onSortTypeChange(sortByName)
            : false
        }
      >
        Имя
      </button>
      <button
        type="button"
        className={
          sortType === sortByPrice
            ? 'service-sort__button service-sort__button--disabled'
            : 'service-sort__button'
        }
        onClick={() =>
          sortType !== sortByPrice && onSortTypeChange
            ? onSortTypeChange(sortByPrice)
            : false
        }
      >
        Цена
      </button>
    </div>
  );
};

export default ServiceSort;
