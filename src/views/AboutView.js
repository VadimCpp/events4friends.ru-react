import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { Link } from "react-router-dom";
import './AboutView.css';

class AboutView extends Component {
  openChat() {
    window.location.href = 'https://t.me/events4friends';
  }

  render() {
    return (
      <div className="about-view">
        <div className="container container-center about-view-container">
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
