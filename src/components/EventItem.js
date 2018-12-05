import React, { Component } from 'react';
import './EventItem.css';

class EventItem extends Component {
  render() {
    return (      
      <div className="event-item">
        📅    
        {this.props.googleEvent.start.dateTime} 
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
