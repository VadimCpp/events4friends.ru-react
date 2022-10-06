import React from 'react';
import RadioButton from '../../../../components/RadioButton';
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
    <div className="service-sort">
      <span className="service-sort__label">Сортировка:</span>
      <RadioButton
        onClick={() =>
          sortType !== sortByService && onSortTypeChange
            ? onSortTypeChange(sortByService)
            : false
        }
        active={sortType === sortByService}
        type={BUTTON_TYPE}
      >
        Услуга
      </RadioButton>

      <RadioButton
        onClick={() =>
          sortType !== sortByName && onSortTypeChange
            ? onSortTypeChange(sortByName)
            : false
        }
        active={sortType === sortByName}
        type={BUTTON_TYPE}
      >
        Имя
      </RadioButton>

      <RadioButton
        onClick={() =>
          sortType !== sortByPrice && onSortTypeChange
            ? onSortTypeChange(sortByPrice)
            : false
        }
        active={sortType === sortByPrice}
        type={BUTTON_TYPE}
      >
        Цена
      </RadioButton>
    </div>
  );
};

export default ServiceSort;
