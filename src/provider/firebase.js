import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { updateTelegramPinnedMessage } from './telegram';

export const getConfig = async () => {
  //
  // NOTE!
  // Load config from firebase
  //
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
  //
  // NOTE!
  // Load services from firebase
  //
  try {
    const db = firebase.firestore();
    const querySnapshot = await db.collection('services').get();
    const services = querySnapshot.docs.map(item => ({
      ...item.data(),
      id: item.id,
    }));
    return services;
  } catch (error) {
    console.warn('Error getting services, skip: ', error);
  }
};

export const subscribeForEventsChanges = setEventsState => {
  //
  // NOTE!
  // Get realtime updates with Cloud Firestore
  // https://firebase.google.com/docs/firestore/query-data/listen
  //

  try {
    const db = firebase.firestore();
    console.info('Subscribe for events changes');
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
        setEventsState({
          events,
          loadingEvents: false,
        });
        console.info('Get shapshot: events updated successfully');
      }
    });
  } catch (error) {
    console.warn('Subscribe for events error', error);
  }
};

export const deleteEvent = (eventId, callback) => {
  console.info('Delete event, eventId:', eventId);

  const db = firebase.firestore();
  db.collection('events')
    .doc(eventId)
    .delete()
    .then(() => {
      callback(true);
      updateTelegramPinnedMessage();
    })
    .catch(error => {
      callback(false);
      console.warn('Error removing document:', error);
      alert(
        'Не удалось удалить событие. Пожалуйста, обратитесь в службу поддержки.',
      );
    });
};

export const editEvent = (data, docId, callback) => {
  console.info('Updating event');

  const db = firebase.firestore();
  db.collection('events')
    .doc(docId)
    .update(data)
    .then(() => {
      console.info('Document successfully updated!');
      callback(docId);
      updateTelegramPinnedMessage();
    })
    .catch(error => {
      console.warn('Error updating event', error);
      callback(null);
    });
};

export const createEvent = (data, callback) => {
  console.info('Creating event');

  const db = firebase.firestore();
  db.collection('events')
    .add(data)
    // eslint-disable-next-line no-shadow
    .then(data => {
      if (data && data.id && callback) {
        callback(data.id);
        updateTelegramPinnedMessage();
      } else {
        console.warn('Something went wrong, contact support');
        alert(
          'Что-то пошло не так при создании события. Пожалуйста, обратитесь в службу поддержки.',
        );
      }
    })
    .catch(error => {
      console.warn('Error creating event', error);
      alert(
        'Не удалось создать событие. Пожалуйста, обратитесь в службу поддержки.',
      );
      callback(null);
    });
};

export const signIn = (email, password) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .catch(error => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') {
        alert('Wrong password.');
      } else {
        alert(errorMessage);
      }
      console.info(error);
    });
};

export const signOut = () => {
  console.info('Sign user out');
  firebase.auth().signOut();
};

export const updateProfile = async displayName => {
  try {
    const user = firebase.auth().currentUser;
    console.info('Updating user profile...', user);
    await user.updateProfile({ displayName });
    console.info('User profile has been updated succesfully', user);
    return JSON.parse(JSON.stringify(user));
  } catch (err) {
    console.warn('Error updating user profile:', err);
  }
};

export const authAndSubscribe = async (initState, setState, setEventsState) => {
  try {
    firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        //
        // NOTE!
        // User is signed in.
        //
        if (user.isAnonymous) {
          console.info('onAuthStateChanged: user is logged in anonymously');
        } else {
          console.info('onAuthStateChanged: user is logged in successfully');
        }

        const config = await getConfig();
        const services = await getServices();
        subscribeForEventsChanges(setEventsState);

        return setState({
          user,
          config,
          services,
          connectingToFirebase: false,
        });
      }
      console.info(
        'onAuthStateChanged: user is not loggen in, login anonymously',
      );
      //
      // NOTE!
      // Log in anonymously
      //
      await firebase.auth().signInAnonymously();
      return setState(initState);
    });
  } catch (error) {
    console.error('Auth Error', error);
  }
};

export const fireBaseInitAndAuth = async (
  config,
  initState,
  setState,
  setEventsState,
) => {
  firebase.initializeApp(config);
  await authAndSubscribe(initState, setState, setEventsState);
};
