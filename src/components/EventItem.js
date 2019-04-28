import React, { Component } from 'react';
import Moment from 'react-moment'
import 'moment/locale/ru';
import './EventItem.css';

class EventItem extends Component {

  state = {
    moreInfo: false
  }
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

  formatEndTime() {
    if (this.props.googleEvent.end && this.props.googleEvent.end.dateTime) {
      return (
        <span className="event-time">
          <Moment format="HH:mm" locale="ru">
            {this.props.googleEvent.end.dateTime}
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

  formatEmail() {
    if (this.props.googleEvent.creator.email) {
      return (
        <div className='event-email'>
          <span>{this.props.googleEvent.creator.email}</span>
          <button className='btn btn-link btn-email' onClick={() => window.open(`mailto:${this.props.googleEvent.creator.email}`)}><svg id="i-mail" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" stroke="currentcolor"  >
            <path d="M2 26 L30 26 30 6 2 6 Z M2 6 L16 16 30 6" />
          </svg></button>
        </div >
      );
    } else {
      return null;
    }
  }

  formatName() {
    if (this.props.googleEvent.creator.displayName) {
      return (
        <div className='event-name'>
          <p>Автор: {this.props.googleEvent.creator.displayName}</p>
        </div>
      );
    } else {
      return null;
    }
  }

  formatDescription() {
    if (this.props.googleEvent.description) {
      return (
        <div className='event-description'>
          <p dangerouslySetInnerHTML={{ __html: this.props.googleEvent.description }}>{}</p>
        </div>
      );
    } else {
      return null;
    }
  }

  moreInfo() {
    if (!this.state.moreInfo) {
      return (
        <div className='event-more btn-container'>
          <button type="button" class="btn btn-light btn-more" onClick={() => this.setState({ moreInfo: !this.state.moreInfo })}> Подробнее...</button>
        </div>)
    } else {
      return (
        <div className='event-more'>
          {this.formatDescription()}
          {this.formatName()}
          {this.formatEmail()}
          <div className='btn-container'>

            <button type="button" class="btn btn-light btn-more" onClick={() => this.setState({ moreInfo: !this.state.moreInfo })}>Свернуть</button>
          </div>
        </div>
      )
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
        {this.formatEndTime()}

        － «
        {this.formatSummary()}
        »

        📍
        {this.formatLocation()}


        {this.moreInfo()}

      </div>
    )
  }
}


export default EventItem;
