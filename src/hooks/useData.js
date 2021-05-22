import { useState, useEffect } from 'react';
import * as firebase from 'firebase/app';
import 'firebase/auth';

export const getConfig = async () => {
  try {
    const db = firebase.firestore();
    const doc = await db
      .collection('config')
      .doc('general')
      .get();

    if (doc.exists) {
      console.info('Get config successfully from Firebase');
      return doc.data();
    }
    console.warn('Error getting config, skip: ', doc);
    return null;
  } catch (error) {
    console.warn('Error getting config, skip: ', error);
  }
};

export const getCommunities = async () => {
  try {
    const db = firebase.firestore();
    const snapshot = await db.collection('communities').get();
    return snapshot.docs.map(doc => doc.data());
  } catch (error) {
    console.warn('Error getting communities, skip: ', error);
  }
};

//
// NOTE!
// Get realtime updates with Cloud Firestore
// https://firebase.google.com/docs/firestore/query-data/listen
//
export const subscribeForEventsChanges = onUpdate => {
  try {
    const db = firebase.firestore();
    return db.collection('events').onSnapshot(async snapshot => {
      if (snapshot && snapshot.docs && snapshot.docs.length) {
        const events = snapshot.docs.reduce((result, item) => {
          return [
            ...result,
            {
              ...item.data(),
              id: item.id,
            },
          ];
        }, []);
        onUpdate(events);
      }
    });
  } catch (error) {
    console.warn('Subscribe for events error', error);
  }
};

//
// NOTE!
// Get realtime updates with Cloud Firestore
// https://firebase.google.com/docs/firestore/query-data/listen
//
export const subscribeForServicesChanges = onUpdate => {
  try {
    const db = firebase.firestore();
    return db.collection('services').onSnapshot(async snapshot => {
      if (snapshot && snapshot.docs && snapshot.docs.length) {
        const services = snapshot.docs.reduce((result, item) => {
          return [
            ...result,
            {
              ...item.data(),
              id: item.id,
            },
          ];
        }, []);
        onUpdate(services);
      }
    });
  } catch (error) {
    console.warn('Subscribe for services error', error);
  }
};

const useData = () => {
  const [events, setEvents] = useState([]);
  const [services, setServices] = useState([]);
  const [config, setConfig] = useState({});
  const [communities, setCommuities] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [loadingServices, setLoadingServices] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const aConfig = await getConfig();
      setConfig(aConfig);
      const aCommunities = await getCommunities();
      setCommuities(aCommunities);
    };

    //
    // NOTE!
    // Данные об услугах и конфигурации извлекаются только один раз при открытии сайта
    // Для обновления данных сайт необходимо перегрузить
    //
    getData();

    //
    // NOTE!
    // Изменения данных в анонсах происходят автоматически без перезагрузки сайтов
    //
    const unsubscribeFromEventsChanges = subscribeForEventsChanges(
      newEvents => {
        setEvents(newEvents);
        setLoadingEvents(false);
      },
    );

    const unsubscribeFromServicesChanges = subscribeForServicesChanges(
      newServices => {
        setServices(newServices);
        setLoadingServices(false);
      },
    );

    return () => {
      if (unsubscribeFromEventsChanges) {
        unsubscribeFromEventsChanges();
      }
      if (unsubscribeFromServicesChanges) {
        unsubscribeFromServicesChanges();
      }
    };
  }, []);

  return {
    events,
    services,
    config,
    communities,
    loadingEvents,
    loadingServices,
  };
};

export default useData;
