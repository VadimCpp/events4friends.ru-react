import React, { Component } from 'react';
import EventItem from '../components/EventItem.js'
import { Button } from 'reactstrap';
import { Link } from "react-router-dom";
import './MainView.css';

class MainView extends Component {
  displayEvents(loading, events) {
    if (loading) {
      return (
          <div>loading</div>
        );
    } else {

      const sortedEvents = events.sort((a, b) => {
        if (a.start && a.start.dateTime &&
          b.start && b.start.dateTime) {
          return a.start.dateTime < b.start.dateTime ? -1 : 1;
        }
        return 0;
      }); 

      const listItems = sortedEvents.map((event) =>
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
        <div className="container container-center main-view-container">
          <div className="pt-5">            
            
          </div>
          <div className="pt-5 pb-5">
            <p>
              На главной только список событий. Остальные возможности пока находятся в разделе "О сообществе".
            </p>
            <p>              
              <Button color="warning">
                <Link className="reset-link-style" to="/about">О сообществе</Link>                
              </Button>
            </p>
          </div>        
        </div>
      </div>
    )
  }
}


export default MainView;
