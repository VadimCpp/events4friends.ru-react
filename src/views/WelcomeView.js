import React, { Component } from 'react'
import './WelcomeView.css'
import Button from '../components/Button'
import ButtonLink from '../components/ButtonLink'
import { Link } from 'react-router-dom'

class WelcomeView extends Component {
  render() {
    return (
      <div className="welcomeview">
        <div className="welcomeview__block">
          <div className="container container-center">
            <span>Добро пожаловать в цифровое общественное публичное пространство!</span>
          </div>
        </div>
        
        <div className="welcomeview__block">
          <div className="container container-center">
            <p>Предстоящие мероприятия тут:</p>

            <ButtonLink 
              to="/list" 
              icon="/icons/icon_list.png"
              title="Открыть список"
              style={{ 
                width: 250,
                display: 'block',
                marginRight: 'auto',
                marginLeft: 'auto',
                marginBottom: 10
              }}
            />

            <div>
              <Link to="/map">
                <Button tag="div" icon="/icons/icon_map.png" >
                  Открыть карту
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="welcomeview__block">
          <div className="container container-center">
            <p>Выберите мессенджер для общения:</p>
            <Button href="https://t.me/events4friends" icon="/icons/telegram.png" borderColor="#139BD0"></Button>
            <Button href="https://chat.whatsapp.com/DWUaZ1bsuxwJLALyvBYTt8" icon="/icons/wa.png" borderColor="#57BB63"></Button>
            <Button href="https://invite.viber.com/?g2=AQBA7jF9Y7%2BXBkqTI0PoYF%2BmnEMluxPdGZy8wJQ3PRPBLT%2BMeh344RxBuBUTVc6B" icon="/icons/viber.png" borderColor="#7C519B"></Button>
          </div>
        </div>

        <div className="welcomeview__block">
          <div className="container container-center">
            <p>Действует группа ВКонтакте:</p>
            <Button href="https://vk.com/kldevents4friends" icon="/icons/vk.png" borderColor="#4D76A1">Открыть ВКонтакте</Button>
          </div>
        </div>

        <div className="container container-center">
          <p className="welcomeview__footer">Здесь действуют правила поведения в общественных местах и нормы законов РФ</p>
        </div>
      </div>
    )
  }
}

export default WelcomeView