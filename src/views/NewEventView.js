import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import Button from '../components/Button'
import ButtonLink from '../components/ButtonLink';
import ButtonExternalLink from '../components/ButtonExternalLink';
import { AuthContext } from '../context/AuthContext'
import { DataContext } from '../context/DataContext'
import './NewEventView.css';

class NewEventView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      summary: 'Название',
      description: 'Описание',
      isOnline: true,
      location: 'Место/Ссылка',
      start: '',
      end: '',
      reference: 'Ссылка на источник',
    }
  }

  handleSummaryChange = (e) => {
    this.setState({ summary: e.target.value });
  }

  handleDescriptionChange = (e) => {
    this.setState({ description: e.target.value });
  }

  handleIsOnlineChange = () => {
    this.setState({ isOnline: true });
  }

  handleIsOfflineChange = () => {
    this.setState({ isOnline: false });
  }

  handleLocationChange = (e) => {
    this.setState({ location: e.target.value });
  }

  handleStartChange = (e) => {
    this.setState({ start: e.target.value });
  }

  handleEndChange = (e) => {
    this.setState({ end: e.target.value });
  }

  handleReferenceChange = (e) => {
    this.setState({ reference: e.target.value });
  }

  createNewEventForUser = (user, createEvent) => {
    const {
      summary,
      description,
      isOnline,
      location,
      start,
      end,              
      reference,
    } = this.state;

    //
    // NOTE!
    // First verify all the data
    //
    let verified = true;

    if (!summary) {
      verified = false;
      alert('Пожалуйста, введите название мероприятия');
    } else if (!description) {
      verified = false;
      alert('Пожалуйста, введите полное описание мероприятия');
    } else if (!location) {
      verified = false;
      alert('Пожалуйста, введите место проведения мероприятия');
    } else if (!start) {
      verified = false;
      alert('Пожалуйста, укажите время начала мероприятия');
    }

    if (verified) {
      if (user && user.email) {
        const event = {
          summary,
          description,
          isOnline,
          location,
          contact: user.email,
          start,
          end,
          reference
        }
        createEvent(event, (id) => {
          console.log('Event created successfully, open it')
          this.props.history.push(`event/${id}`)
        })
      } else {
        alert('Извините, невозможно создать мероприятие. Обратитесь в техподдержку.')
        console.warn('Error user data, skip')
      }
    } else {
      console.warn('Error verify data, skip')
    }
  }

  render() {
    return (
      <div>
        <div>
          <ButtonLink
            to="/list"
            icon="/icons/icon_arrow_back.png"
            title="К списку"
            style={{
              width: 155,
              display: 'block',
              marginRight: 'auto',
              marginLeft: 'auto',
              marginBottom: 26,
              borderColor: 'rgba(77, 77, 77, .2)'
            }}
          />
        </div>
        <AuthContext.Consumer>
          {({ user }) => {
            const {
              summary,
              description,
              isOnline,
              location,
              start,
              end,              
              reference,
            } = this.state;

            let userAuthorized = false
            if (user) {
              const { isAnonymous } = user;
              if (isAnonymous === false) {
                userAuthorized = true
              }
            }

            return userAuthorized ? (
              <DataContext.Consumer>
                {({ createEvent }) => {
                  return (
                    <div className="neweventview">
                      <div className="textinput">
                        <label>
                          <p className="text-left">
                            Короткое название мероприятия:
                          </p>
                          <input
                            className="textinput__input"
                            type="text"
                            name="summary"
                            value={summary}
                            onChange={this.handleSummaryChange}
                          />
                        </label>
                      </div>
                      <div className="textinput">
                        <label>
                          <p className="text-left">
                            Полное описание:
                          </p>
                          <input
                            className="textinput__input"
                            type="text"
                            name="description"
                            value={description}
                            onChange={this.handleDescriptionChange}
                          />
                        </label>
                      </div>
                      <div className="textinput">
                        <p className="text-left">
                          Где будет мероприятие?
                        </p>
                        <p>
                          <label>
                            <span className="text-left">
                              Онлайн
                            </span>
                            <input
                              className="textinput__input"
                              type="radio"
                              name="isOnline"
                              checked={isOnline}
                              onChange={this.handleIsOnlineChange}
                            />
                          </label>
                        </p>
                        <p>
                          <label>
                            <span className="text-left">
                              Офлайн
                            </span>
                            <input
                              className="textinput__input"
                              type="radio"
                              name="isOnline"
                              checked={!isOnline}
                              onChange={this.handleIsOfflineChange}
                            />
                          </label>
                        </p>
                      </div>
                      <div className="textinput">
                        <label>
                          <p className="text-left">
                            {isOnline ? 'Ссылка онлайн мероприятия:' : 'Укажите адрес встречи:'}
                          </p>
                          <input
                            className="textinput__input"
                            type="text"
                            name="location"
                            value={location}
                            onChange={this.handleLocationChange}
                          />
                        </label>
                      </div>                
                      <div className="textinput">
                        <label>
                          <p className="text-left">
                            Начало мероприятия:
                          </p>
                          <input
                            className="textinput__input"
                            type="datetime-local"
                            name="start"
                            value={start}
                            onChange={this.handleStartChange}
                          />
                        </label>
                      </div> 
                      <div className="textinput">
                        <label>
                          <p className="text-left">
                            Окончание мероприятия (необязательно):
                          </p>
                          <input
                            className="textinput__input"
                            type="datetime-local"
                            name="end"
                            value={end}
                            onChange={this.handleEndChange}
                          />
                        </label>
                      </div>
                      <div className="textinput">
                        <label>
                          <p className="text-left">
                            Контакт организатора:
                          </p>
                          <input
                            className="textinput__input"
                            type="text"
                            name="location"
                            value={user.email}
                            disabled
                          />
                        </label>
                      </div>
                      <div className="textinput">
                        <label>
                          <p className="text-left">
                            Ссылка на источник (необязательно):
                          </p>
                          <input
                            className="textinput__input"
                            type="text"
                            name="reference"
                            value={reference}
                            onChange={this.handleReferenceChange}
                          />
                        </label>
                      </div>                                                    
                      <Button
                        onPress={() => {
                          this.createNewEventForUser(user, createEvent)
                        }}
                        icon="/icons/icon_plus.png"
                      >
                        Создать
                      </Button>
                    </div>
                  )
                }}
              </DataContext.Consumer>
            ) : (
              <div>
                <p>
                  Для того, чтобы добавлять мероприятия, выполните вход
                </p>
              </div>
            )
          }}
        </AuthContext.Consumer> 
        
        <div className="border-top">
          <div className="container container-center pt-4 pb-5">
            <p>У вас есть вопросы о том, как добавить мероприятие? 
              Задайте вопрос в чате:</p>
            <ButtonExternalLink
              href="https://tglink.ru/events4friends"
              icon="/icons/telegram.png"
              style={{
                borderColor: "#139BD0",
                margin: 8
              }}
            />
            <ButtonExternalLink
              href="https://chat.whatsapp.com/DWUaZ1bsuxwJLALyvBYTt8"
              icon="/icons/wa.png"
              style={{
                borderColor: "#57BB63",
                margin: 8
              }}
            />
            <ButtonExternalLink
              href="https://invite.viber.com/?g2=AQBA7jF9Y7%2BXBkqTI0PoYF%2BmnEMluxPdGZy8wJQ3PRPBLT%2BMeh344RxBuBUTVc6B"
              icon="/icons/viber.png"
              style={{
                borderColor: "#7C519B",
                margin: 8
              }}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(NewEventView);
