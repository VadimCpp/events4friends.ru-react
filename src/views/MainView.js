import React, { Component } from 'react';
import LogoTitle from '../components/LogoTitle.js'
import { Button } from 'reactstrap';
import './MainView.css';

class MainView extends Component {
  openChat() {    
    // TODO: put yandex goals here
    window.location.href = 'https://t.me/events4friends';
  }

  openDonate() {
    // TODO: put yandex goals here
    alert('Not implemented');
  }

  render() {
    return (
      <div class="main-view">
        <LogoTitle />
        <div class="mt-5">
          Events List (TODO)
        </div>
        <div class="mt-5">
          Перейти к обсуждениям в <br />          
          <Button
            color="link" 
            onClick={this.openChat}
          >
            telegram-чат
          </Button>
        </div>
        <div class="mt-5">
          Перейти на страницу <br /> 
          <Button 
            color="link"
            onClick={this.openDonate}
          >
            пожертвований
          </Button>
        </div>
      </div>
    )
  }
}


export default MainView;
