import React, { Component } from 'react';
import moment from 'moment';
import EventCard from '../components/EventCard.js';
import ButtonLink from '../components/ButtonLink';
import EventsFilter from '../components/EventsFilter';
import { AuthContext } from '../context/AuthContext'
import { DataContext } from '../context/DataContext'
import './EventsView.css';

const EventsFilterType = {
  Upcoming: 'UPCOMING_EVENTS',
  Past: 'PAST_EVENTS',
  // TODO: add more types here
};

class EventsView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filterType: EventsFilterType.Upcoming,
    };
  }

  /**
   * @param {Event} event 
   * @param {EventsSource} source 
   */
  displayEvent(event, source) {
    if (!event || !source) {
      return null;
    }
    
    return (
      <div key={event.id}>
        <EventCard
          event={event}
          name={source.name}
        />
      </div>
    );
  }

  render() {
    const { filterType } = this.state;

    return (
      <DataContext.Consumer>
        {({ events }) => {
          const now = new Date();
          let sortedEvents = [...events];

          if (filterType === EventsFilterType.Upcoming) {
            sortedEvents = sortedEvents.filter((event) => {
              return event.start && event.timezone
                ? moment(`${event.start}${event.timezone}`).toDate() > now
                : false;
            });

            sortedEvents.sort((a, b) => {
              if (a.start > b.start) {
                return 1;
              } else if (a.start < b.start) {
                return -1;
              }
              return 0;
            });
          } else if (filterType === EventsFilterType.Past) {
            sortedEvents = sortedEvents.filter((event) => {
              return event.start && event.timezone
                ? moment(`${event.start}${event.timezone}`).toDate() < now
                : false;
            });

            sortedEvents.sort((a, b) => {
              if (a.start < b.start) {
                return 1;
              } else if (a.start > b.start) {
                return -1;
              }
              return 0;
            });
          }

          const eventsList = sortedEvents.map((item) => { 
            return {
              event: item,
              source: {
                name: 'База данных events4friends'
              },
            }
          });

          return (
            <div className="main-view">
              <div>
                <ButtonLink 
                  to="/" 
                  icon="/icons/icon_arrow_back.svg"
                  title="На главную"
                  style={{ 
                    width: 175,
                    display: 'block',
                    marginRight: 'auto',
                    marginLeft: 'auto',
                    marginBottom: 10,
                    borderColor: 'rgba(77, 77, 77, .2)',
                    borderRadius: "48px"
                  }}
                />
              </div>
              <AuthContext.Consumer>
                {({ user }) => {
                  let userAuthorized = false
                  if (user) {
                    const { isAnonymous } = user;
                    if (isAnonymous === false) {
                      userAuthorized = true
                    }
                  }
                  console.log('userAuthorized', userAuthorized)
                  return userAuthorized ? (
                    <div>
                      <ButtonLink 
                        to="/newevent" 
                        icon="/icons/icon_plus.svg"
                        title="Сделать анонс"
                        style={{ 
                          width: 200,
                          display: 'block',
                          marginRight: 'auto',
                          marginLeft: 'auto',
                          marginBottom: 10,
                          borderColor: 'rgba(77, 77, 77, .2)',
                          borderRadius: "48px"
                        }}
                      />
                    </div>
                  ) : (
                    <div>
                      <p>
                        Для того, чтобы добавлять мероприятия, выполните вход
                      </p>
                    </div>
                  )
                }}
              </AuthContext.Consumer>
              <div className="container pt-3">
                <EventsFilter
                  onFilterTypeChange={(value) => this.setState({filterType: value})}
                  filterType={filterType}
                  upcoming={EventsFilterType.Upcoming} 
                  past={EventsFilterType.Past}
                />
              </div>
              <div className="pt-3">
                { eventsList.length ? eventsList.map(eventItem => this.displayEvent(eventItem.event, eventItem.source)) : null }
              </div>
            </div>
          )
        }}
      </DataContext.Consumer>
    )
  }
}

export default EventsView;
