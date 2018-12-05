import React, { Component } from 'react';
import Moment from 'react-moment'
import 'moment/locale/ru';
import './EventItem.css';

class EventItem extends Component {
  formatStartDate() {
    if (this.props.googleEvent.start && this.props.googleEvent.start.dateTime) {      
      return (
        <span className="event-date">
          <Moment format="LL" locale="ru">
            {this.props.googleEvent.start.dateTime}
          </Moment>
        </span>
      );
    } else {
      return (
        <span className="event-date">
          Не указано
        </span>
      );      
    }
  }

  formatStartTime() {
    if (this.props.googleEvent.start && this.props.googleEvent.start.dateTime) {      
      return (
        <span className="event-time">
          <Moment format="HH:mm" locale="ru">
            {this.props.googleEvent.start.dateTime}
          </Moment>
        </span>
      );
    } else {
      return (
        <span className="event-time">
          Не указано
        </span>
      );      
    }
  }

  formatSummary() {
    if (this.props.googleEvent.summary) {      
      return (
        <span className="event-summary">
            {this.props.googleEvent.summary}
        </span>
      );
    } else {
      return (
        <span className="event-summary">
          Не указано
        </span>
      );      
    }
  }

  formatLocation() {
    if (this.props.googleEvent.location) {
      /**
       * @type {!string}
       */  
      let location = this.props.googleEvent.location;

      /**
       * @type {!string}
       */  
      let simpleLocation = '';

      /**
       * @type {!number}
       */  
      let secondCommaPosition = location.indexOf(',', location.indexOf(',', 0) + 1);

      if (secondCommaPosition > 0) {
        simpleLocation = location.substr(0, secondCommaPosition);
      }

      return (
        <span className="event-location">
          {simpleLocation}
        </span>
      );
    } else {
      return (
        <span className="event-location">
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

        － «
        {this.formatSummary()}
        »
        
        📍
        {this.formatLocation()}
      </div>      
    )
  }
}


export default EventItem;
