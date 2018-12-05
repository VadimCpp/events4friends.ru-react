import React, { Component } from 'react';
import './EventItem.css';

class EventItem extends Component {
  render() {
    return (      
      <li class="event-item">
        {JSON.stringify(this.props.googleEvent)}
      </li>      
    )
  }
}


export default EventItem;
