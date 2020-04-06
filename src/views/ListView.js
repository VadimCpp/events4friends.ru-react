import React, { Component } from 'react';
import EventCard from '../components/EventCard.js';
import ButtonLink from '../components/ButtonLink';
import { AuthContext } from '../context/AuthContext'
import { DataContext } from '../context/DataContext'
import './ListView.css';

class ListView extends Component {
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
    const { eventsSources } = this.props;

    let commonList = [];

    eventsSources.forEach(source => {
      const events = source.getEvents();

      if (!events || !events.length) {
        return;
      }
      
      events.forEach(event => {
        commonList.push({source, event});
      });
    });

    return (
      <DataContext.Consumer>
        {({ events }) => {
          
          const unifiedFBEvents = events.map((item) => { 
            return {
              event: item,
              source: {
                name: 'Events For Friends - База данных'
              },
            }
          });

          commonList = [ ...unifiedFBEvents, ...commonList ]

          commonList.sort((firstEl, secondEl) => {
            return firstEl.event.start > secondEl.event.start ? -1 : 1;
          });
      
          commonList.length = 10;

          return (
            <div className="main-view">
              <div>
                <ButtonLink 
                  to="/" 
                  icon="/icons/icon_arrow_back.png"
                  title="На главную"
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
                        icon="/icons/icon_plus.png"
                        title="Сделать анонс"
                        style={{ 
                          width: 205,
                          display: 'block',
                          marginRight: 'auto',
                          marginLeft: 'auto',
                          marginBottom: 10,
                          borderColor: 'rgba(77, 77, 77, .2)'
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
              <div className="pt-3">
                { commonList.length ? commonList.map(eventItem => this.displayEvent(eventItem.event, eventItem.source)) : null }
              </div>
            </div>
          )
        }}
      </DataContext.Consumer>
    )
  }
}

export default ListView;
