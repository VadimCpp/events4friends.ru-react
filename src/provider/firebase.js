import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { notifyTelegramBot } from './telegram';

export const deleteEvent = (event, user, callback) => {
  console.info('Delete event:', event.id);

  const db = firebase.firestore();
  db.collection('events')
    .doc(event.id)
    .delete()
    .then(() => {
      callback(true);
      notifyTelegramBot(
        {
          summary: event.summary,
          start: event.start,
          timezone: event.timezone,
          id: event.id,
          delete: true,
        },
        user.displayName || user.email || 'Не указано',
      );
    })
    .catch(error => {
      callback(false);
      console.warn('Error removing document:', error);
      alert(
        'Не удалось удалить событие. Пожалуйста, обратитесь в службу поддержки.',
      );
    });
};

export const editEvent = (data, docId, user, callback) => {
  console.info('Updating event');

  const db = firebase.firestore();
  db.collection('events')
    .doc(docId)
    .update(data)
    .then(() => {
      console.info('Document successfully updated!');
      callback(docId);
      notifyTelegramBot(
        {
          summary: data.summary,
          start: data.start,
          timezone: data.timezone,
          id: data.id,
          edit: true,
        },
        user.displayName || user.email || 'Не указано',
      );
    })
    .catch(error => {
      console.warn('Error updating event', error);
      callback(null);
    });
};

export const createEvent = (eventData, user, callback) => {
  console.info('Creating event');

  const db = firebase.firestore();
  db.collection('events')
    .add(eventData)
    // eslint-disable-next-line no-shadow
    .then(data => {
      if (data && data.id && callback) {
        callback(data.id);
        notifyTelegramBot(
          {
            summary: eventData.summary,
            start: eventData.start,
            timezone: eventData.timezone,
            id: data.id,
            create: true,
          },
          user.displayName || user.email || 'Не указано',
        );
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

export const createService = (data, callback) => {
  console.info('Creating service');

  const db = firebase.firestore();
  db.collection('services')
    .add(data)
    // eslint-disable-next-line no-shadow
    .then(data => {
      if (data && data.id && callback) {
        callback(data.id);
      } else {
        console.warn('Something went wrong, contact support');
        alert(
          'Что-то пошло не так при создании услуги. Пожалуйста, обратитесь в службу поддержки.',
        );
      }
    })
    .catch(error => {
      console.warn('Error creating service', error);
      alert(
        'Не удалось создать услугу. Пожалуйста, обратитесь в службу поддержки.',
      );
      callback(null);
    });
};

export const deleteService = (serviceId, callback) => {
  console.info('Delete service, serviceId:', serviceId);

  const db = firebase.firestore();
  db.collection('services')
    .doc(serviceId)
    .delete()
    .then(() => {
      callback(true);
    })
    .catch(error => {
      callback(false);
      console.warn('Error removing document:', error);
      alert(
        'Не удалось удалить услугу. Пожалуйста, обратитесь в службу поддержки.',
      );
    });
};

export const editService = (data, docId, callback) => {
  console.info('Updating service');

  const db = firebase.firestore();
  db.collection('services')
    .doc(docId)
    .update(data)
    .then(() => {
      console.info('Document successfully updated!');
      callback(docId);
    })
    .catch(error => {
      console.warn('Error updating service', error);
      callback(null);
    });
};
