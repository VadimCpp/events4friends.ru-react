import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { Link } from "react-router-dom";
import './AboutView.css';

class AboutView extends Component {
  createEvent() {
    // TODO:
    // ym('51441281', 'create-event-click');    
    window.location.href = 'https://goo.gl/forms/7ZomljxN7PAor8aI2';
  }

  openChat() {
    // TODO:
    // ym('51441281', 'open-chat-click');    
    window.location.href = 'https://t.me/events4friends';
  }

  openDonate() {
    // TODO:
    // ym('51441281', 'donate-click');
    window.location.href = 'https://money.yandex.ru/to/41001866582787';
  }

  render() {
    return (
      <div className="about-view">
        <div className="container container-center about-view-container">
          <div className="pt-5">
            <p>
              Планируете собрать друзей? Заполните простую анкету и вскоре ваше событие отобразится
              на этом сайте.
            </p>
            <p>
              <Button
                color="warning"
                onClick={this.createEvent}
              >
                Создать событие
              </Button>
            </p>
          </div>
          <div className="pt-5">
            <p>
              Приглашаем Вас в чат, где можно получить ответы на все вопросы и спланировать мероприятие.
            </p>
            <p>
              <Button
                color="warning"
                onClick={this.openChat}
              >
                Telegram-чат
              </Button>
            </p>
          </div>
          <div className="pt-5">
            <p>
              Принимаем пожервования. Аредна помещений, билеты, трансфер, вкусный чай с плюшками - все стоит денег.
              Схема простая: больше денег - лучше мероприятия.
            </p>
            <p>
              <Button
                color="warning"
                onClick={this.openDonate}
              >
                Перевести деньги
              </Button>
            </p>
          </div>
          <div className="py-5">
            <hr className="separator" />
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

export default AboutView;
