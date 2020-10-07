/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Button from '../components/Button';
import ButtonLink from '../components/ButtonLink';
import ButtonExternalLink from '../components/ButtonExternalLink';
import { AuthContext } from '../context/AuthContext';
import { DataContext } from '../context/DataContext';
import { ReachTextEditor } from '../components/RichTextEditor';
import './EditEventView.css';

class EditEventView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      summary: '',
      description: '',
      isOnline: true,
      location: '',
      timezone: '+0200',
      start: '',
      end: '',
      name: '',
      id: '',
      updatingEvent: false,
    };
  }

  handleSummaryChange = e => {
    this.setState({ summary: e.target.value });
  };

  handleDescriptionChange = value => {
    this.setState({ description: value });
  };

  handleIsOnlineChange = () => {
    this.setState({ isOnline: true });
  };

  handleIsOfflineChange = () => {
    this.setState({ isOnline: false });
  };

  handleTimeZoneChange = timezone => {
    this.setState({ timezone });
  };

  handleLocationChange = e => {
    this.setState({ location: e.target.value });
  };

  handleStartChange = e => {
    this.setState({ start: e.target.value });
  };

  handleEndChange = e => {
    this.setState({ end: e.target.value });
  };

  handleNameChange = e => {
    this.setState({ name: e.target.value });
  };

  editEventForUser = (user, editEvent) => {
    const {
      summary,
      description,
      isOnline,
      location,
      timezone,
      start,
      end,
      name,
      id,
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
    } else if (!name) {
      verified = false;
      alert('Пожалуйста, укажите имя организатора');
    }

    if (verified) {
      if (user && user.email) {
        const event = {
          summary,
          description,
          isOnline,
          location,
          contact: user.email,
          name,
          timezone,
          start,
          end,
        };
        editEvent(event, id, aSuccess => {
          if (aSuccess) {
            console.info('Event updated successfully, open it');
            this.props.history.push(`/event/${id}`);
          } else {
            this.setState({ updatingEvent: false });
            alert(
              'Не удалось изменить событие. Пожалуйста, обратитесь в службу поддержки.',
            );
          }
        });
      } else {
        alert(
          'Извините, невозможно изменить мероприятие. Обратитесь в техподдержку.',
        );
        console.warn('Error user data, skip');
      }
    } else {
      console.warn('Error verify data, skip');
    }
  };

  render() {
    return (
      <div>
        <div>
          <ButtonLink
            to="/events"
            icon="/icons/icon_arrow_back.svg"
            title="К списку"
            style={{
              width: 155,
              display: 'block',
              marginRight: 'auto',
              marginLeft: 'auto',
              marginBottom: 10,
              borderColor: 'rgba(77, 77, 77, .2)',
              borderRadius: '48px',
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
              timezone,
              start,
              end,
              name,
              updatingEvent,
            } = this.state;

            let userAuthorized = false;
            if (user) {
              const { isAnonymous } = user;
              if (isAnonymous === false) {
                userAuthorized = true;
              }
            }

            return userAuthorized ? (
              <DataContext.Consumer>
                {({ events, editEvent }) => {
                  const eventId = this.props.match.params.id;
                  let event = null;
                  // TODO: исправить обновление state в render

                  for (let i = 0; i < events.length; i++) {
                    if (eventId === events[i].id) {
                      event = events[i];
                      if (event.id !== this.state.id) {
                        this.setState({
                          summary: event.summary,
                          description: event.description,
                          isOnline: event.isOnline,
                          location: event.location,
                          timezone: event.timezone,
                          start: event.start,
                          end: event.end,
                          name: event.name,
                          id: event.id,
                        });
                      }
                      break;
                    }
                  }
                  return event ? (
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
                        <p className="text-left">Полное описание:</p>
                        <div className="rte-container">
                          <ReachTextEditor
                            onChange={this.handleDescriptionChange}
                            description={description}
                          />
                        </div>
                      </div>
                      <div className="textinput">
                        <p className="text-left">Где будет мероприятие?</p>
                        <p>
                          <label>
                            <span className="text-left">Онлайн</span>
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
                            <span className="text-left">Офлайн</span>
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
                            {isOnline
                              ? 'Ссылка онлайн мероприятия:'
                              : 'Укажите адрес встречи:'}
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
                        <p className="text-left">Часовая зона?</p>
                        <p>
                          <label>
                            <span className="text-left">
                              Калининград (GMT+2)
                            </span>
                            <input
                              className="textinput__input"
                              type="radio"
                              name="timeZone"
                              checked={timezone === '+0200'}
                              onChange={() => {
                                this.handleTimeZoneChange('+0200');
                              }}
                            />
                          </label>
                        </p>
                        <p>
                          <label>
                            <span className="text-left">Москва (GMT+3)</span>
                            <input
                              className="textinput__input"
                              type="radio"
                              name="timeZone"
                              checked={timezone === '+0300'}
                              onChange={() => {
                                this.handleTimeZoneChange('+0300');
                              }}
                            />
                          </label>
                        </p>
                      </div>
                      <div className="textinput">
                        <label>
                          <p className="text-left">Начало мероприятия:</p>
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
                          <p className="text-left">Контакт организатора:</p>
                          <input
                            className="textinput__input"
                            type="text"
                            name="contact"
                            value={user.email}
                            disabled
                          />
                        </label>
                      </div>
                      <div className="textinput">
                        <label>
                          <p className="text-left">Имя организатора:</p>
                          <input
                            className="textinput__input"
                            type="text"
                            name="name"
                            value={name}
                            onChange={this.handleNameChange}
                          />
                        </label>
                      </div>
                      {updatingEvent ? (
                        <div>
                          <p>Сохраняем событие...</p>
                        </div>
                      ) : (
                        <Button
                          onPress={() => {
                            this.setState({ updatingEvent: true }, () => {
                              this.editEventForUser(user, editEvent);
                            });
                          }}
                          icon="/icons/icon_save.svg"
                        >
                          Сохранить
                        </Button>
                      )}
                    </div>
                  ) : (
                    <div>
                      <p>
                        Событие не найдено, возможно оно удалено. Рекомендуем
                        вернуться к списку анонсов и выбрать мероприятие еще
                        раз.
                      </p>
                    </div>
                  );
                }}
              </DataContext.Consumer>
            ) : (
              <div>
                <p>Для того, чтобы редактировать мероприятия, выполните вход</p>
              </div>
            );
          }}
        </AuthContext.Consumer>

        <div className="border-top">
          <div className="container container-center pt-4 pb-5">
            <p>
              У вас есть вопросы о том, как редактировать мероприятие? Задайте
              вопрос в чате:
            </p>
            <ButtonExternalLink
              href="tg://resolve?domain=events4friends"
              icon="/icons/telegram.svg"
              alt="telegram"
              style={{
                borderColor: '#139BD0',
                margin: 8,
              }}
            />
            <ButtonExternalLink
              href="https://chat.whatsapp.com/DWUaZ1bsuxwJLALyvBYTt8"
              icon="/icons/whatsapp.svg"
              alt="whatsapp"
              style={{
                borderColor: '#57BB63',
                margin: 8,
              }}
            />
            <ButtonExternalLink
              href="https://invite.viber.com/?g2=AQBA7jF9Y7%2BXBkqTI0PoYF%2BmnEMluxPdGZy8wJQ3PRPBLT%2BMeh344RxBuBUTVc6B"
              icon="/icons/viber.svg"
              alt="viber"
              style={{
                borderColor: '#7C519B',
                margin: 8,
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(EditEventView);
