import { useState, useEffect } from 'react';
import * as firebase from 'firebase/app';
import 'firebase/auth';

//
// NOTE!
// Каждый первый ревьювер отмечает, как плохо хранить ключи в коде.
//
// Отвечаем:
//  - эти ключи дают только доступ на чтение;
//  - после сборки эти данные всегда доступны в коде сайта, их нет смысла прятать;
//  - ключи оставлены тут специально, чтобы уменьшить время развертывания исходников.
//
// Пример кода, где это действительно необходимо:
// https://github.com/VadimCpp/events4friendsbot/blob/master/.env.default
//
const firebaseConfig = {
  apiKey: 'AIzaSyBjAQdqx3qkki7MVb6dd1eASw-0UGs2Bg0',
  authDomain: 'events4friends.firebaseapp.com',
  databaseURL: 'https://events4friends.firebaseio.com',
  projectId: 'events4friends',
  storageBucket: 'events4friends.appspot.com',
  messagingSenderId: '610960096409',
  appId: '1:610960096409:web:337ff9ec4ca355a6c28c08',
  measurementId: 'G-4T13RKFFSG',
};

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [connectingToFirebase, setConnectingToFirebase] = useState(true);

  useEffect(() => {
    try {
      firebase.initializeApp(firebaseConfig);
      firebase.auth().onAuthStateChanged(async aUser => {
        if (aUser) {
          setUser(aUser);
        } else {
          setUser(null);
          await firebase.auth().signInAnonymously();
        }
      });
      setConnectingToFirebase(false);
    } catch (error) {
      console.error('Auth Error', error);
    }
  }, []);

  return { user, connectingToFirebase };
};

export default useAuth;
