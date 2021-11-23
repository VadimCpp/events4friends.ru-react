import React, { useState, useContext, useEffect, useCallback } from 'react';
import Cookies from 'universal-cookie';
import { DataContext } from '../../context/DataContext';
import { AuthContext } from '../../context/AuthContext';
import ServiceCard from '../../components/ServiceCard';
import ButtonLink from '../../components/ButtonLink';
import ServiceSort from '../../components/ServiceSort';
import Spinner from '../../components/Spinner';
import { NOTICES } from '../../enums';
import './ServicesView.css';

const ServiceSortingType = {
  SortByName: 'SORT_BY_NAME',
  SortByService: 'SORT_BY_SERVICE',
  SortByPrice: 'SORT_BY_PRICE',
};

const ServicesView = ({ match, history }) => {
  const { user, connectingToFirebase } = useContext(AuthContext);
  const { services, loadingServices, communities } = useContext(DataContext);
  const isAuth = user && !user.isAnonymous;

  const [sortType, setSortType] = useState(ServiceSortingType.SortByService);
  const [sortedServices, setSortedServices] = useState([]);

  const { slug } = match.params;
  const [community, setCommunity] = useState(null);
  useEffect(() => {
    if (slug) {
      //
      // NOTE!
      // Если в URL указан slug сообщества необходимо:
      // - произвести поиск по slug
      // - если сообщество не найдено, отобразить NOT_FOUND
      //
      const aCommunity = communities.find(c => c.slug === slug);
      if (aCommunity) {
        setCommunity(aCommunity);
      } else {
        // TODO: реализовать NOT_FOUND экран
        console.warn('TODO: реализовать NOT_FOUND экран');
        history.push('/');
      }
    } else {
      //
      // NOTE!
      // Если в URL не указан slug сообщества необходимо:
      // - произвести поиск по id из cookies
      // - по умолчанию id сообщества - 1 (events4friends)
      //
      const cookies = new Cookies();
      const communityId = cookies.get('communityId');
      if (!communityId) {
        history.push('/communities/');
      } else {
        const aCommunity = communities.find(c => c.id === communityId);
        if (aCommunity) {
          setCommunity(aCommunity);
        }
      }
    }
  }, [history, communities, slug]);

  const getSortedServices = useCallback(() => {
    let aSortedServices = [...services];

    if (sortType === ServiceSortingType.SortByName) {
      aSortedServices = aSortedServices.sort((a, b) => {
        return a.name ? a.name.localeCompare(b.name) : 0;
      });
    } else if (sortType === ServiceSortingType.SortByService) {
      aSortedServices = aSortedServices.sort((a, b) => {
        return a.service ? a.service.localeCompare(b.service) : 0;
      });
    } else if (sortType === ServiceSortingType.SortByPrice) {
      aSortedServices = aSortedServices.sort((a, b) => {
        if (a.isFree && b.isFree) {
          return 0;
        }
        if (a.isFree) {
          return -1;
        }
        if (b.isFree) {
          return 1;
        }
        if (a.price && b.price) {
          return a.price < b.price ? -1 : 0;
        }
        if (a.price && !b.price) {
          return -1;
        }
        if (a.price && !b.price) {
          return 1;
        }
        return 0;
      });
    }

    return aSortedServices;
    // return aSortedServices.map(service => displayService(service));
  }, [services, sortType]);

  useEffect(() => {
    if (community) {
      const sortServices = getSortedServices();
      const sortServices4Community = sortServices.filter(e => {
        const communityId = e.communityId || '1';
        return communityId === community.id;
      });
      setSortedServices(sortServices4Community);
    }
  }, [community, getSortedServices]);

  const displayService = service => {
    let highlightName = false;

    if (sortType === 'SORT_BY_NAME') {
      highlightName = true;
    }

    if (!service) {
      return null;
    }

    return (
      <div key={service.id}>
        <ServiceCard service={service} highlightName={highlightName} />
      </div>
    );
  };

  return (
    <div className="main-view">
      <div>
        <ButtonLink
          to="/"
          icon="/icons/icon_arrow_back.svg"
          title="На главную"
          className="btn-back"
        />
        <>
          {isAuth ? (
            <div>
              <ButtonLink
                to="/newservice"
                icon="/icons/icon_service_plus.svg"
                title="Добавить услугу"
                classList={['button-link', 'services-view']}
              />
            </div>
          ) : (
            <div>
              <p>Для того, чтобы добавлять услуги, выполните вход</p>
            </div>
          )}
        </>
      </div>

      <ServiceSort
        onSortTypeChange={value => setSortType(value)}
        sortType={sortType}
        sortByName={ServiceSortingType.SortByName}
        sortByService={ServiceSortingType.SortByService}
        sortByPrice={ServiceSortingType.SortByPrice}
      />

      {connectingToFirebase ? (
        <Spinner message={NOTICES.CONNECT_TO_DB} />
      ) : (
        <>
          {loadingServices ? (
            <Spinner message={NOTICES.LOADING_SERVICES} />
          ) : (
            <>
              {!!sortedServices.length && (
                <div className="pt-3">
                  {sortedServices.map(service => displayService(service))}
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default ServicesView;
