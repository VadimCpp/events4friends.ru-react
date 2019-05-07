import React, { Component } from 'react';
import Moment from 'react-moment';
import AddToCalendar from 'react-add-to-calendar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'react-add-to-calendar/dist/react-add-to-calendar.css';
import { Link, withRouter } from "react-router-dom";
import 'moment/locale/ru';
import './EventItem.css';

class EventItem extends Component {

  state = {
    moreInfo: false,
    event: {
      title: '',
      description: '',
      location: '',
      startTime: '2019-01-01T00:00:00',
      endTime: '2019-01-01T00:00:00'
    }
  }

  componentDidMount() {
    this.setState({event: {
      title: this.props.googleEvent.summary,
      description: this.props.googleEvent.description,
      location: this.props.googleEvent.location,
      startTime: this.props.googleEvent.start.dateTime,
      endTime: this.props.googleEvent.end.dateTime,
    }});
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
          <p dangerouslySetInnerHTML={{ __html: this.props.googleEvent.description }} />
        </div>
      );
    } else {
      return null;
    }
  }

  shareEvent = () => {
    const { googleEvent } = this.props;

    const startDate = 'Не указано';
    const startTime = 'Не указано';
    const endTime = 'Не указано';
    const summary = googleEvent.summary || 'Не указано';
    const location = 'Не указано';
    const url = `http://events4friends.ru/event/${this.props.googleEvent.id}/`;

    const details = `📅 ${startDate} 🕗 ${startTime} - ${endTime} － «${summary}» 📍${location}`;

    const shareText = `Приглашаю на мероприятие:\n\n${details}\n\nПодробнее на сайте:\n${url}`;

    alert(shareText);
  }

  moreInfo() {
    let icon = { 'calendar-plus-o': 'left' };
    let items = [
      { google: 'Google' },
      { apple: 'Apple Calendar' },
      { outlook: 'Outlook' },
    ];

    if (!this.state.moreInfo) {
      return (
        <div className='event-more btn-container'>
          <button type="button" className="btn btn-light btn-more" onClick={() => this.setState({ moreInfo: !this.state.moreInfo })}> {this.state.moreInfo ? 'Свернуть ↑' : 'Подробнее ↓'}</button>
          <button type="button" className="btn btn-light btn-more" ><Link className="reset-link-style" to={`/event/${this.props.googleEvent.id}`} onClick={() => this.props.getEvent(this.props.googleEvent.id)}>К событию</Link></button>
          <button type="button" className="btn btn-light btn-more" >
            <AddToCalendar
              event={this.state.event}
              buttonTemplate={icon}
              buttonLabel="Добавить в календарь"
              listItems={items}
            />
          </button>
          <button type="button" className="btn btn-light btn-more" onClick={this.shareEvent}>            
            <FontAwesomeIcon icon="share" className="share-icon"/>
            {'Поделиться'}
          </button>
        </div >)
    } else {
      return (
        <div className='event-more'>
          <div className='event-more btn-container '>
            <button type="button" className="btn btn-light btn-more" onClick={() => this.setState({ moreInfo: !this.state.moreInfo })}> {this.state.moreInfo ? 'Свернуть ↑' : 'Подробнее ↓'}</button>
            <button type="button" className="btn btn-light btn-more" ><Link className="reset-link-style" to={`/event/${this.props.googleEvent.id}`} onClick={() => this.props.getEvent(this.props.googleEvent.id)}>К событию</Link></button>            
            <button type="button" className="btn btn-light btn-more" >
              <AddToCalendar
                event={this.state.event}
                buttonTemplate={icon}
                buttonLabel="Добавить в календарь"
                listItems={items}
              />
            </button>
            <button type="button" className="btn btn-light btn-more" onClick={this.shareEvent}>
              <FontAwesomeIcon icon="share" className="share-icon"/>
              {'Поделиться'}
            </button>
          </div>
          {this.renderInfoBlock()}
        </div>
      )
    }
  }

  renderInfoBlock = () => {
    return (
      <>
        {this.formatDescription()}
        {this.formatName()}
        {this.formatEmail()}
      </>
    )
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


        {this.props.match.path === '/' ? this.moreInfo() : this.renderInfoBlock()}

      </div>
    )
  }
}


export default withRouter(EventItem);
