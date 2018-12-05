import React, { Component } from 'react';
import LogoTitle from '../components/LogoTitle.js'
import EventItem from '../components/EventItem.js'
import { Button } from 'reactstrap';
import Calendar from 'react-google-calendar-events-list';
import './MainView.css';

class MainView extends Component {
  createEvent() {
    // TODO: put yandex goals here
    window.location.href = 'https://goo.gl/forms/7ZomljxN7PAor8aI2';
  }

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

      const listItems = events.map((event) =>
        <li key={event.id}>
          <EventItem 
            googleEvent={event}
          />
        </li>
      );

      return (
        <ul className="event-list">{listItems}</ul>
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
            <p>
              Планируете собрать друзей? Заполните простую анкету и вскоре ваше событие отобразится
              на этом сайте.
            </p>
            <p>
              <Button
                color="warning" 
                onClick={this.createEvent}
              >
                Создать событие
              </Button>
            </p>
          </div>          
          <div className="pt-5">
            <p>
              Приглашаем Вас в чат, где можно получить ответы на все вопросы и спланировать мероприятие.
            </p>
            <p>
              <Button
                color="warning" 
                onClick={this.openChat}
              >
                Telegram-чат
              </Button>
            </p>
          </div>
          <div className="py-5">
            <p>
              Принимаем пожервования. Аредна помещений, билеты, трансфер, вкусный чай с плюшками - все стоит денег.
              Схема простая: больше денег - лучше мероприятия.
            </p>
            <p>
              <Button 
                color="warning"
                onClick={this.openDonate}
              >
                Перевести деньги
              </Button>
            </p>
          </div>
        </div>
      </div>
    )
  }
}


export default MainView;
