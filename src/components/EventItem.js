import React, { Component } from 'react';
import Moment from 'react-moment'
import 'moment/locale/ru';
import './EventItem.css';

class EventItem extends Component {
  formatStartDate() {
    if (this.props.googleEvent.start && this.props.googleEvent.start.dateTime) {      
      return (
        <span className="event-date-time">
          <Moment format="LL" locale="ru">
            {this.props.googleEvent.start.dateTime}
          </Moment>
        </span>
      );
    } else {
      return (
        <span className="event-date-time">
          Не указано
        </span>
      );      
    }
  }

  formatStartTime() {
    if (this.props.googleEvent.start && this.props.googleEvent.start.dateTime) {      
      return (
        <span className="event-date-time">
          <Moment format="HH:mm" locale="ru">
            {this.props.googleEvent.start.dateTime}
          </Moment>
        </span>
      );
    } else {
      return (
        <span className="event-date-time">
          Не указано
        </span>
      );      
    }
  }

  render() {
    return (      
      <div className="event-item">
        📅  
        {this.formatStartDate()}
        🕗
        {this.formatStartTime()}

        -
        "{this.props.googleEvent.summary}"
        📍
        {this.props.googleEvent.location}
        
        <br /> <hr />

        {JSON.stringify(this.props.googleEvent)}
      </div>      
    )
  }
}


export default EventItem;
