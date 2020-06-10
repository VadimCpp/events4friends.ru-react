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

    this.state = { sortType: ServiceSortingType.SortByService }
  }

  displayService(service) {
    const { sortType } = this.state;
    let highlightName = new Boolean();

    (sortType === 'SORT_BY_NAME') 
    ? highlightName = true 
    : highlightName = false;

    if (!service) {
      return null;
    }

    return (
      <div key={service.id}>
        <ServiceCard
          service={service}
          highlightName={highlightName}
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

        <ServiceSort
          onSortTypeChange={(value) => this.setState({ sortType: value })}
          sortType={sortType}
          sortByName={ServiceSortingType.SortByName}
          sortByService={ServiceSortingType.SortByService}
          sortByPrice={ServiceSortingType.SortByPrice}
        />

        <div className="pt-3">
          <DataContext.Consumer>
            {({ services }) => {
              let sortedServices = [...services];

              if (sortType === ServiceSortingType.SortByName) {
                sortedServices = sortedServices.sort((a, b) => {
                  return a.name ? a.name.localeCompare(b.name) : 0;
                });
              } else if (sortType === ServiceSortingType.SortByService) {
                sortedServices = sortedServices.sort((a, b) => {
                  return a.service ? a.service.localeCompare(b.service) : 0;
                });
              } else if (sortType === ServiceSortingType.SortByPrice) {
                sortedServices = sortedServices.sort((a, b) => {
                  if (a.isFree && b.isFree) {
                    return 0;
                  } else if (a.isFree) {
                    return -1;
                  } else if (b.isFree) {
                    return 1;
                  } else if (a.price && b.price) {
                    return a.price < b.price ? -1 : 0;
                  } else if (a.price && !b.price) {
                    return -1;
                  } else if (a.price && !b.price) {
                    return 1;
                  }
                  return 0;
                });
              }

              return sortedServices.map(service => this.displayService(service))
            }}
          </DataContext.Consumer>
        </div>
      </div>
    )
  }
}

export default ServicesView;
