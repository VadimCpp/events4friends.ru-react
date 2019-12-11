import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { Link } from "react-router-dom";
import EventItem from '../components/EventItem.js'
import './EventView.css';

class EventView extends Component {

    displayEvents(events) {
        const currentEvent = events.filter(event => event.event.id === this.props.match.params.id)
        const listItems = currentEvent.map((event) =>
            <li key={event.event.id}>
                <EventItem
                    getEvent={this.props.getEvent}
                    googleEvent={event.event}
                    name={event.calendarName}
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

        let allListEvents = [];
        
        for (let i = 0; i < googleEvents.length; i++) {
            if (googleEvents[i]) {      
                // allListEvents - единый массив событий из элементов { событие, имя календаря }
                const eventsArray = googleEvents[i].events;
                const calendarName = googleEvents[i].calendarName;
                for (let j = 0; j < eventsArray.length; j++) {
                    allListEvents.push({
                        event: eventsArray[j],
                        calendarName
                    });
                }
            }
        }

        return (
            <div className="event-view">
                <div className="container container-center event-view-container">
                    <div className="pt-5">
                        {this.displayEvents(allListEvents)}
                    </div>
                    <div className="pt-5 pb-5">
                        <p>
                            <Button color="warning">
                                <Link className="reset-link-style" to="/archive">Архив</Link>
                            </Button>
                        </p>
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
