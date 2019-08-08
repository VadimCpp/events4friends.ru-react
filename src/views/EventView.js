import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { Link, Redirect } from "react-router-dom";
import EventItem from '../components/EventItem.js'
import './EventView.css';

class EventView extends Component {

    displayEvents(events) {
        const currentEvent = events.filter(event => event.id === this.props.match.params.id)
        const listItems = currentEvent.map((event) =>
            <li key={event.id}>
                <EventItem
                    getEvent={this.props.getEvent}
                    googleEvent={event}
                />
            </li>
        );

        return <ul className="event-list">{listItems}</ul>;
    }


    render() {
        const { googleEvents } = this.props;

        //
        // NOTE!
        // googleEvents - массив, каждый элемент которого является массивом событий
        // Тут собираем все события всех календарей в единый массив
        //

        let allEvents = [];
        
        for (let i = 0; i < googleEvents.length; i++) {
            if (googleEvents[i]) {
                allEvents = [...allEvents, ...googleEvents[i].events];
            }  
        }

        if (!allEvents.length) {
            return <Redirect to="/" />
        }

        return (
            <div className="event-view">
                <div className="container container-center event-view-container">
                    <div className="pt-5">
                        {this.displayEvents(allEvents)}
                    </div>
                    <div className="pt-5 pb-5">
                        <p>
                            <Button color="warning">
                                <Link className="reset-link-style" to="/about">О сообществе</Link>
                            </Button>
                        </p>
                        <p>
                            <Button color="warning">
                                <Link className="reset-link-style" to="/">На главную</Link>
                            </Button>
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}

export default EventView;
