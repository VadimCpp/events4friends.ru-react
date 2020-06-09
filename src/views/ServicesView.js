import React, { Component } from 'react';
import ServiceCard from '../components/ServiceCard';
import ButtonLink from '../components/ButtonLink';
import { DataContext } from '../context/DataContext'
import './ServicesView.css';
import ServiceSort from '../components/ServiceSort';

const ServiceSortingType = {
  SortByName: 'SORT_BY_NAME',
  SortByService: 'SORT_BY_SERVICE',
  SortByPrice: 'SORT_BY_PRICE'
}

class ServicesView extends Component {
  constructor(props) {
    super(props)

    this.state = {sortType: ServiceSortingType.SortByName}
  }

  displayService(service) {
    if (!service) {
      return null;
    }
    
    return (
      <div key={service.id}>
        <ServiceCard
          service={service}
        />
      </div>
    );
  }

  render() {
    const { sortType } = this.state;

    return (
      <div className="main-view">
        <div>
          <ButtonLink 
            to="/" 
            icon="/icons/icon_arrow_back.png"
            title="На главную"
            style={{ 
              width: 175,
              display: 'block',
              marginRight: 'auto',
              marginLeft: 'auto',
              marginBottom: 10,
              borderColor: 'rgba(77, 77, 77, .2)'
            }}
          />
        </div>
        {/* <ServiceSort /> */}
        <ServiceSort 
          onSortTypeChange={(value) => this.setState({sortType: value})}
          sortType = {sortType}
          sortByName = {ServiceSortingType.SortByName}
          sortByService = {ServiceSortingType.SortByService}
          sortByPrice = {ServiceSortingType.SortByPrice}
        />
        <div>
          {sortType === ServiceSortingType.SortByName && (<p>Сортировка по категории: Имя</p>)}
          {sortType === ServiceSortingType.SortByService && (<p>Сортировка по категории: Услуга</p>)}
          {sortType === ServiceSortingType.SortByPrice && (<p>Сортировка по категории: Цена</p>)}
        </div>
        <div className="pt-3">
          <DataContext.Consumer>
            {({ services }) => {
              return services.map(service => this.displayService(service))
            }}
          </DataContext.Consumer> 
        </div>
      </div>
    )
  }
}

export default ServicesView;
