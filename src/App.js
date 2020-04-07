import React, { Component } from 'react';
import ClipboardJS from 'clipboard';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faShare } from '@fortawesome/free-solid-svg-icons';
import * as firebase from 'firebase/app';
import "firebase/auth";
import "firebase/firestore";

import AppRouter from './AppRouter.js'
import { AuthContext } from './context/AuthContext'
import { DataContext } from './context/DataContext'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.unsubscribeFromEventsChanges = () => {}
    this.state = {
      user: null,
      services: [
        {
          id: 'service5',
          name: 'HR сообщество (initial)',
          service: 'Трудовое право',
          description: 'В нашем чате мы предлегаем бесплатные консультации по трудовому праву. Вы знаете, что работодатель не имеет права Вас сократить в столь нелегкое время? А мы знаем!',
          isFree: true,
          telegram: 'hrchatv2'
        },
        {
          id: 'service6',
          name: 'IT сообщество (initial)',
          service: 'IT консультации',
          description: 'В нашем сообществе мы предлагаем бесплатные консультации по всем вопросам ИТ. Мы знаем все!',
          isFree: true,
          telegram: 'frontendbasics'
        },
      ],
      events: [],
      config: {
        description: "Цифровое пространство (initial)",
        name: "events4friends (initial)",
        version: '0.1 (initial)'
      },      
    }
  }

  componentDidMount() {
    //
    // NOTE!
    // Add here all new icons used in the app.
    //
    library.add(faShare);

    //
    // NOTE!
    // Init clipboard instance once
    //
    this.clipboard = new ClipboardJS('.btn-clipboard');
    this.clipboard.on('success', function(e) {
      console.info('Action:', e.action);
      console.info('Text:', e.text);
      console.info('Trigger:', e.trigger);
   
      e.clearSelection();
    });
    this.clipboard.on('error', function(e) {
      console.error('Action:', e.action);
      console.error('Trigger:', e.trigger);
    });

    //
    // NOTE!
    // Init firebase
    //
    var firebaseConfig = {
      apiKey: "AIzaSyBjAQdqx3qkki7MVb6dd1eASw-0UGs2Bg0",
      authDomain: "events4friends.firebaseapp.com",
      databaseURL: "https://events4friends.firebaseio.com",
      projectId: "events4friends",
      storageBucket: "events4friends.appspot.com",
      messagingSenderId: "610960096409",
      appId: "1:610960096409:web:337ff9ec4ca355a6c28c08",
      measurementId: "G-4T13RKFFSG"
    };

    firebase.initializeApp(firebaseConfig);

    //
    // NOTE!
    // Listen to onAuthStateChanged
    //
    const that = this
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        //
        // NOTE!
        // User is signed in.
        //
        if (user.isAnonymous) {
          console.log('onAuthStateChanged: user is logged in anonymously');
        } else {
          console.log('onAuthStateChanged: user is logged in successfully');
        }
        that.setState({ user }, () => {
          that.getConfig();
          that.getServices();
          that.subscribeForEventsChanges()
        });
      } else {
        console.log('onAuthStateChanged: user is not loggen in, login anonimously');
        //
        // NOTE!
        // Log in anonymously
        //        
        that.setState({ user: null }, () => {
          firebase.auth().signInAnonymously().catch(function(error) {
            console.warn('Error signing in anonymously, skip: ', error);
          });  
        });
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromEventsChanges();
    this.clipboard = null;
    clearTimeout(this.timer);
  }

  getConfig = () => {
    //
    // NOTE!
    // Load config from firebase
    //
    const that = this
    const db = firebase.firestore();
    db.collection("config").doc('general').get()
    .then(function(doc) {
        if (doc.exists) {
          console.log("Get config successfully from Firebase");
          that.setState({
            config: doc.data()
          })
        } else {
          console.warn('Error getting config, skip: ', doc);
        }
    })
    .catch(function(error) {
      console.warn("Error getting config, skip: ", error);
    });
  }

  getServices = () => {
    //
    // NOTE!
    // Load services from firebase
    //
    const that = this
    const db = firebase.firestore();
    db.collection("services").get()
    .then(function(querySnapshot) {
      const services = querySnapshot.docs.map(item => ({ ...item.data(), id: item.id }))
      that.setState({ services })
    })
    .catch(function(error) {
      console.warn("Error getting services, skip: ", error);
    });    
  }

  subscribeForEventsChanges = () => {
    //
    // NOTE!
    // Get realtime updates with Cloud Firestore
    // https://firebase.google.com/docs/firestore/query-data/listen
    //
    const that = this
    const db = firebase.firestore();

    console.log('Subscribe for events changes')

    this.unsubscribeFromEventsChanges = db.collection('events')
      .onSnapshot(async snapshot => {
        if (snapshot && snapshot.docs && snapshot.docs.length) {
          const events = snapshot.docs.reduce((result, item) => {
            return [...result, { ...item.data(), id: item.id }]
          }, [])
          that.setState({ events }, () => {
            console.log('Get shapshot: events updated successfully')
          })
        }
      })
  }
    
  signIn = (email, password) => {
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') {
        alert('Wrong password.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
    });
  }
  
  signOut = () => {
    console.log('Sign user out')
    firebase.auth().signOut();
  }

  createEvent = (data, callback) => {
    console.log('Creating event')

    const db = firebase.firestore();
    db.collection("events").add(data)
    .then((data) => {
      if (data && data.id && callback) {
        callback(data.id)
      } else {
        console.warn('Something went wrong, contact support');
        alert('Что-то пошло не так при создании события. Пожалуйста, обратитесь в службу поддержки.')
  
      }
    })
    .catch((error) => {
      console.warn('Error creating event', error);
      alert('Не удалось создать событие. Пожалуйста, обратитесь в службу поддержки.')
    })
  }

  editEvent = (data, docId, callback) => {
    console.log('Updating event')

    const db = firebase.firestore();
    db.collection("events").doc(docId).update(data)
    .then(() => {
      console.log("Document successfully updated!");
      callback(true)
    })
    .catch((error) => {
      console.warn('Error updating event', error);
      callback(false)
    })
  }

  deleteEvent = (eventId, callback) => {
    console.log('Delete event, eventId:', eventId)

    const db = firebase.firestore();
    db.collection("events").doc(eventId).delete().then(function() {
      callback(true)
    }).catch(function(error) {
      callback(false)
      console.warn("Error removing document:", error);
      alert('Не удалось удалить событие. Пожалуйста, обратитесь в службу поддержки.')
    });
  }

  render() {
    return (
      <AuthContext.Provider value={{
        user: this.state.user,
        signIn: this.signIn,
        signOut: this.signOut,
      }}>
        <DataContext.Provider value={{
          events: this.state.events,
          createEvent: this.createEvent,
          deleteEvent: this.deleteEvent,
          editEvent: this.editEvent,
          services: this.state.services,
          config: this.state.config,
        }}>
          <div className="App">
            <AppRouter />
          </div>
        </DataContext.Provider>
      </AuthContext.Provider>
    );
  }
}

export default App;
