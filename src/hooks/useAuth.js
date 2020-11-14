import { useState, useEffect } from 'react';
import * as firebase from 'firebase/app';
import 'firebase/auth';

// константа, можно/нужно вынести из функции, можно вынести из файла, например в .env
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
// использование двух useEffect не гарантирует ожидания выполнения первого затем второго, весь код внутри будет объеденен React-ом,
// поэтому нет смыла использовать два useEffect, минусы такого подхода я показывал в примере.
  useEffect(() => {
      try {
      // мы используем try/catch что очень правильно, добавим сюда же выполнение firebase.initializeApp
      firebase.initializeApp(firebaseConfig);
      firebase.auth().onAuthStateChanged(async aUser => {
        if (aUser) {
          setUser(aUser);
        } else {
          setUser(null);
          await firebase.auth().signInAnonymously();
        }
      });
    } catch (error) {
      console.error('Auth Error', error);
    }
  }, []);
    
  return { user };
};

export default useAuth;
