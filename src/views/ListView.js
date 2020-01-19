import React, { Component } from 'react';
import EventCard from '../components/EventCard.js';
import './ListView.css';

class ListView extends Component {
  /**
   * @param {EventsSource} source 
   */
  displaySource(source) {
    if (!source) {      
      return null;
    }

    const events = source.getEvents();

    if (!events || !events.length) {
      return null;
    }
    
    return events.map(event => {
      return (
        <div key={event.id}>
          <EventCard
            getEvent={this.props.getEvent}
            event={event}
            name={source.name}
          />
        </div>
      );
    });
  }

  render() {
    const { eventsSources } = this.props;

    return (
      <div className="main-view">
        <div className="pt-3">
          { eventsSources.length ? eventsSources.map(source => this.displaySource(source)) : null }
        </div>
      </div>
    )
  }
}

export default ListView;
