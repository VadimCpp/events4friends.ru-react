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

//
// NOTE!
// Get realtime updates with Cloud Firestore
// https://firebase.google.com/docs/firestore/query-data/listen
//
export const subscribeForEventsChanges = (onUpdate, afterSuccess, afterAll) => {
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
        afterSuccess(false);
      }
    });
  } catch (error) {
    console.warn('Subscribe for events error', error);
  } finally {
    afterAll(false);
  }
};

//
// NOTE!
// Get realtime updates with Cloud Firestore
// https://firebase.google.com/docs/firestore/query-data/listen
//
export const subscribeForServicesChanges = (
  onUpdate,
  afterSuccess,
  afterAll,
) => {
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
        afterSuccess(false);
      }
    });
  } catch (error) {
    console.warn('Subscribe for services error', error);
  } finally {
    afterAll(false);
  }
};

const useData = () => {
  const [events, setEvents] = useState([]);
  const [services, setServices] = useState([]);
  const [config, setConfig] = useState({});
  const [connectingToFirebase, setConnectingToFirebase] = useState(true);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [loadingServices, setLoadingServices] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const aConfig = await getConfig();
      setConfig(aConfig);
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
      newEvents => setEvents(newEvents),
      setLoadingEvents,
      setConnectingToFirebase,
    );

    const unsubscribeFromServicesChanges = subscribeForServicesChanges(
      newServices => setServices(newServices),
      setLoadingServices,
      setConnectingToFirebase,
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
    connectingToFirebase,
    loadingEvents,
    loadingServices,
  };
};

export default useData;
