import React, { Component } from 'react';
import LogoTitle from '../components/LogoTitle.js'
import { Button } from 'reactstrap';
import Calendar from 'react-google-calendar-events-list';
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

  displayEvents(loading, events) {
    if (loading) {
      return (
          <div>loading</div>
        );
    } else {
      return (
        <div>{JSON.stringify(events)}</div>
      );      
    }
  }

  render() {
    return (
      <div className="main-view">
        <LogoTitle />
        <div className="container container-center main-view-container">
          <div className="pt-5">            
            <Calendar
              calendarID="dveenjcu4k5ktd3k8pv4iul2bk@group.calendar.google.com"
              apiKey="AIzaSyBOXnnT1F-h9s1FP3063BQ_o0KtD7Y0DPs"
            >
              {({loading, events}) =>
                this.displayEvents(loading, events)
              }
            </Calendar>
          </div>
          <div className="pt-5">
            Перейти к обсуждениям в <br />          
            <Button
              color="link" 
              onClick={this.openChat}
            >
              telegram-чат
            </Button>
          </div>
          <div className="pt-5">
            Перейти на страницу <br /> 
            <Button 
              color="link"
              onClick={this.openDonate}
            >
              пожертвований
            </Button>
          </div>
        </div>
      </div>
    )
  }
}


export default MainView;
