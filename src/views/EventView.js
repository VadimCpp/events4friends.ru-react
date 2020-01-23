import React, { Component } from 'react';
import ButtonLink from '../components/ButtonLink';
import './EventView.css';

class EventView extends Component {

  render() {
    return (
      <div className="event-view">
        <div className="container container-center event-view-container">
          <div>
            <ButtonLink 
              to="/list" 
              icon="/icons/icon_arrow_back.png"
              title="К списку"
              style={{ 
                width: 175,
                display: 'block',
                marginRight: 'auto',
                marginLeft: 'auto',
                marginBottom: 10,
                borderColor: 'rgba(77, 77, 77, .2)'
              }}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default EventView;
