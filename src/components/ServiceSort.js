import React, { Component } from 'react';
import './ServiceSort.css';


class ServiceSort extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { sortType, sortByName, sortByPrice, sortByService, onSortTypeChange } = this.props;

        return (
            <div className="container service-sort">
                <span className="service-sort__label">Сортировка:</span>
                <button
                    className={
                        sortType === sortByName
                            ? "service-sort__button service-sort__button--disabled"
                            : "service-sort__button"
                    }
                    onClick={() => {
                        if (sortType !== sortByName) {
                            this.setState({ sortType: sortByName })
                            if (onSortTypeChange) onSortTypeChange(sortByName)
                        }
                    }}
                >
                    Имя
                </button>
                <button
                    className={
                        sortType === sortByService
                            ? "service-sort__button service-sort__button--disabled"
                            : "service-sort__button"
                    }
                    onClick={() => {
                        if (sortType !== sortByService) {
                            this.setState({ sortType: sortByService })
                            if (onSortTypeChange) onSortTypeChange(sortByService)
                        }
                    }}
                >
                    Услуга
                </button>
                <button
                    className={sortType === sortByPrice
                        ? "service-sort__button service-sort__button--disabled"
                        : "service-sort__button"
                    }
                    onClick={() => {
                        if (sortType !== sortByPrice) {
                            this.setState({ sortType: sortByPrice })
                            if (onSortTypeChange) onSortTypeChange(sortByPrice)
                        }
                    }}
                >
                    Цена
                </button>
            </div>
        )
    }
}

export default ServiceSort;

