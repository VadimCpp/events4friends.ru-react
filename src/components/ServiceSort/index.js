import React from 'react';
import { ButtonAction } from '../ButtonAction';
import './ServiceSort.css';

const BUTTON_TYPE = 'service';

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
      <ButtonAction
        onClick={() =>
          sortType !== sortByService && onSortTypeChange
            ? onSortTypeChange(sortByService)
            : false
        }
        active={sortType === sortByService}
        type={BUTTON_TYPE}
      >
        Услуга
      </ButtonAction>

      <ButtonAction
        onClick={() =>
          sortType !== sortByName && onSortTypeChange
            ? onSortTypeChange(sortByName)
            : false
        }
        active={sortType === sortByName}
        type={BUTTON_TYPE}
      >
        Имя
      </ButtonAction>

      <ButtonAction
        onClick={() =>
          sortType !== sortByPrice && onSortTypeChange
            ? onSortTypeChange(sortByPrice)
            : false
        }
        active={sortType === sortByPrice}
        type={BUTTON_TYPE}
      >
        Цена
      </ButtonAction>
    </div>
  );
};

export default ServiceSort;
