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
              Приветствуем Вас на сайте «events4friends»!
            </p>
            <p>
              Наличие интернета обрушило на людей огромный поток информации.
              В этом быстром потоке новостных лент, фотоотчетов и сообщений легко
              запутаться и «утонуть». Даже такое простое действие, как 
              вечерняя прогулка на Вернем Пруду, стало требовать невероятных временных затрат
              на переписку в чатах. Что уж говорить о мероприятии на десятки и сотни человек.
            </p>
            <p>
              Сайт является информационным ресурсом, который содержит 
              актуальную информацию о предстоящих мероприятиях.
              Задача сайта – ответить на вопросы «что?», «где?» и «когда?» без лишних чатов/запросов к поисковым системам.              
            </p>
            <p>
              Сайт предназначается для некоммерческих огранизаций и сообществ. Сайт не хранит
              никаких данных на сервере, а только отображает в удобном формате
              данные календарей, которые предоставляют сообщества и организации.
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
