import React, { Component } from 'react';
import './ServiceSort.css';

const ServiceSortingType = {
    SortByName: 'SORT_BY_NAME',
    SortByService: 'SORT_BY_SERVICE',
    SortByPrice: 'SORT_BY_PRICE'
}

class ServiceSort extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sortType: ServiceSortingType.SortByName
        }
    }

    render() {
        const { sortType } = this.state

        return (
            <div className="container service-sort">
                <span className="service-sort__label">Сортировка:</span>
                <button
                    className={
                        sortType === ServiceSortingType.SortByName
                            ? "service-sort__button service-sort__button--disabled"
                            : "service-sort__button"
                    }
                    onClick={() => {
                        this.setState({ sortType: ServiceSortingType.SortByName })
                    }}
                >
                    Имя
                </button>
                <button
                    className={
                        sortType === ServiceSortingType.SortByService
                            ? "service-sort__button service-sort__button--disabled"
                            : "service-sort__button"
                    }
                    onClick={() => {
                        this.setState({ sortType: ServiceSortingType.SortByService })
                    }}
                >
                    Услуга
                </button>
                <button
                    className={sortType === ServiceSortingType.SortByPrice
                        ? "service-sort__button service-sort__button--disabled"
                        : "service-sort__button"
                    }
                    onClick={() => {
                        this.setState({ sortType: ServiceSortingType.SortByPrice })
                    }}
                >
                    Цена
                </button>
            </div>
        )
    }
}

export default ServiceSort;

