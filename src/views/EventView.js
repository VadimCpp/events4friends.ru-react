import React, { Component } from 'react';
import EventItem from '../components/EventItem.js'
import { Button } from 'reactstrap';
import { Link } from "react-router-dom";
import './EventView.css';

class EventView extends Component {
    state = {
        googleEvents: []
    }

    displayEvents(events) {
        if (events === []) {
            return (
                <div>loading</div>
            );
        } else {
            const currentEvent = events.filter(event => event.id === this.props.match.params.id)
            const listItems = currentEvent.map((event) =>
                <li key={event.id}>
                    <EventItem
                        getEvent={this.props.getEvent}
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
        if (this.props.googleEvents === []) {
            return
        }
        return (
            <div className="main-view">
                <div className="container container-center main-view-container">
                    <div className="pt-5">
                        {this.displayEvents(this.props.googleEvents)}
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