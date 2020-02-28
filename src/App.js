import React, { Component } from 'react';
import ClipboardJS from 'clipboard';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faShare, faSurprise } from '@fortawesome/free-solid-svg-icons';
import AppRouter from './AppRouter.js'
import { AuthContext } from './context/AuthContext'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    }
  }

  componentDidMount() {
    if (window.VK) {
      const that = this;

      console.log('VK Init started')
      const vk = window.VK;
      vk.init({
        apiId: 7272040
      });
      //
      // Проверка авторизации пользователя:
      // https://vk.com/dev/openapi?f=3.4.%20VK.Auth.getLoginStatus
      //
      vk.Auth.getLoginStatus(function(response) {
        if (response.status === 'connected') {
          console.log('VK Login status: connected');
          if (response.session && response.session.user) {
            const user = response.session.user
            console.log('VK User exists:', user);
            that.setState({
              user
            })
          } else {
            //
            // NOTE!
            // Chrome browser shares cookies:
            // https://stackoverflow.com/questions/6627752/turn-off-chrome-processes-sharing-session-cookie
            // But session.user is empty
            // In this case do login to obtain user name
            //
            console.log('VK User dos not exists, session:', response.session);
            vk.Auth.login(function(loginResponse) {
              console.log('VK User signed in');
              if (
                loginResponse 
                && loginResponse.session
                && loginResponse.session.user
              ) {
                const user = loginResponse.session.user
                console.log('VK User to set:', user);
                that.setState({
                  user
                })
              }
            });  
          }
        } else {
          // Ignore
        }
      });      
    }

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
  }

  componentWillUnmount() {
    this.clipboard = null;
    clearTimeout(this.timer);
  }

  render() {
    return (
      <AuthContext.Provider value={{ user: this.state.user }}>
        <div className="App">
          <AppRouter />
        </div>
      </AuthContext.Provider>
    );
  }
}

export default App;
