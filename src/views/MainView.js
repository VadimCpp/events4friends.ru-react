import React, { Component } from 'react';
import EventItem from '../components/EventItem.js'
import { Button } from 'reactstrap';
import { Link } from "react-router-dom";
import Map from '../components/Map';
import './MainView.css';

class MainView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allMapEvents: [],
      allListEvents: [],
      copied: false
    };
  }
  
  componentDidMount() {
    const { googleEvents } = this.props;

    //
    // NOTE!
    // googleEvents - массив, каждый элемент которого является массивом событий
    // Тут собираем все события всех календарей в единый массив
    //

    let allMapEvents = [];
    let allListEvents = [];
    
    for (let i = 0; i < googleEvents.length; i++) {
      if (googleEvents[i]) {
        allMapEvents = [...allMapEvents, ...googleEvents[i].events];

        // allListEvents - единый массив событий из элементов { событие, имя календаря }
        const eventsArray = googleEvents[i].events;
        for (let j = 0; j < eventsArray.length; j++) {
          allListEvents.push({
            event: eventsArray[j],
            calendarName: googleEvents[i].calendarName
          });
        }
      }  
    }

    //
    // NOTE! 
    // Почему-то функция sort() не работает
    // Ручками "метод пузырька"
    //
    // TODO: разобраться с этим
    //
    if (allListEvents.length > 1) {
      for (let i = 0; i < allListEvents.length - 1; i++) {
        for (let j = i + 1; j < allListEvents.length; j++) {          
          let a = allListEvents[i];
          let b = allListEvents[j];
          if (a.event.start.dateTime.localeCompare(b.event.start.dateTime) === 1) {
            let tmp = allListEvents[i];
            allListEvents[i] = allListEvents[j];
            allListEvents[j] = tmp;
          }
        }
      }
    }

    this.setState({
      allMapEvents,
      allListEvents,
    })
  }

  displayEvent(event, nameCalendar) {  
    return (
      <li className="list-item" key={event.id}>
        <EventItem
          getEvent={this.props.getEvent}
          googleEvent={event}
          name={nameCalendar}
        />
      </li>
    );
  }  

  copyAllEvents() {
    this.setState({ copied: true });
    this.timer = setTimeout(() => {
      this.setState({ copied: false });
    }, 1000);
  }

  render() {
    const { allListEvents, copied } = this.state;

    return (
      <div className="main-view">
        <div className="container container-center main-view-container">
          <div className="pt-5 pb-5">
            <p>
              На главной пока только список событий. Все остальное в разделе "О нас".
            </p>
            <p>
              <Button color="warning">
                <Link className="reset-link-style" to="/about">О нас</Link>
              </Button>
              <button
                type="button"
                className="btn btn-warning"
                disabled={copied}                
                onClick={() => { this.copyAllEvents(); }}
              >
                { copied && (
                  <span>                
                    Скопировано
                  </span>
                )}
                { !copied && (
                  <span>
                    Скопировать все
                  </span>
                )}
                </button>              
            </p>
          </div>
          <div className="pt-3">
            {/*<Map allEvents={allMapEvents}/>*/}
            {allListEvents.map(event => this.displayEvent(event.event, event.calendarName))}
          </div>
        </div>
      </div>
    )
  }
}

export default MainView;
