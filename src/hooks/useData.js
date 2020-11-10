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

export const getServices = async () => {
  try {
    const db = firebase.firestore();
    const querySnapshot = await db.collection('services').get();
    const services = querySnapshot.docs.map(item => ({
      ...item.data(),
      id: item.id,
    }));
    console.info('Get services successfully from Firebase');
    return services;
  } catch (error) {
    console.warn('Error getting services, skip: ', error);
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

const useAuth = () => {
  const [events, setEvents] = useState([]);
  const [services, setServices] = useState([]);
  const [config, setConfig] = useState({});

  useEffect(() => {
    const getData = async () => {
      const aConfig = await getConfig();
      const theServices = await getServices();
      setConfig(aConfig);
      setServices(theServices);
    };

    getData();
  }, []);

  useEffect(() => {
    const unsubscribe = subscribeForEventsChanges(newEvents =>
      setEvents(newEvents),
    );

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  return { events, services, config };
};

export default useAuth;
