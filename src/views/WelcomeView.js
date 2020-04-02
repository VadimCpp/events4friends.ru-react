import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import ButtonLink from '../components/ButtonLink'
import ButtonExternalLink from '../components/ButtonExternalLink'
import { AuthContext } from '../context/AuthContext'
import { DataContext } from '../context/DataContext'
import './WelcomeView.css'

class WelcomeView extends Component {
  render() {
    return (
      <div className="welcomeview">
        <div className="welcomeview__block">
          <AuthContext.Consumer>
            {({ user, signOut }) => {
              let userName = null
              let userAuthorized = false
              if (user) {
                const { isAnonymous, displayName } = user;
                if (isAnonymous) {
                  userName = 'Аноним'
                } else {
                  userName = displayName || 'Не указано'
                  userAuthorized = true
                } 
              }
              return (
                <div className="container container-center">
                  { userAuthorized ? (
                      <div>
                        <span>Добро пожаловать в цифровое пространство, {userName}! </span>
                        <button
                          className="btn btn-link btn-link-vk"
                          onClick={() => signOut()}
                        >
                          <span>Выйти</span>
                        </button>
                      </div>
                    ) : (
                      <div>
                        { userName ? (
                          <span>Добро пожаловать в цифровое пространство, {userName}! </span>
                        ) : (
                          <span>Добро пожаловать в цифровое пространство! </span>
                        )}
                        <button
                          className="btn btn-link btn-link-vk"
                          onClick={() => {
                            this.props.history.push('signin/')
                          }}
                        >
                          <span>Войти</span>
                        </button>
                      </div>
                    )
                  }
                </div>
              )
            }}
          </AuthContext.Consumer>
        </div>
        
        <div className="welcomeview__block">
          <div className="container container-center">
            <p>Рекомендуем ознакомиться (это важно):</p>

            <ButtonLink 
              to="/services" 
              icon="/icons/icon_service.png"
              title="Наши услуги"
              style={{ 
                width: 250,
                display: 'block',
                marginRight: 'auto',
                marginLeft: 'auto',
                marginBottom: 10
              }}
            />
          </div>

          <div className="container container-center mt-5">
            <p>Мероприятия тут:</p>

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
{/* 
            <ButtonLink 
              to="/map" 
              icon="/icons/icon_map.png"
              title="Открыть карту"
              style={{ 
                width: 250,
                display: 'block',
                marginRight: 'auto',
                marginLeft: 'auto',
                marginBottom: 10
              }}
            /> */}
          </div>
        </div>

        <div className="welcomeview__block">
          <div className="container container-center">
            <p>Выберите мессенджер для общения:</p>
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

        <div className="welcomeview__block">
          <div className="container container-center">
            <p>Действует группа ВКонтакте:</p>            
            <ButtonExternalLink 
              href="https://vk.com/kldevents4friends"
              icon="/icons/vk.png" 
              style={{
                borderColor: "#4D76A1",
                margin: 8,
                width: 250,
                display: 'block',
                marginRight: 'auto',
                marginLeft: 'auto',
              }}
              title="Открыть ВКонтакте"
            />
          </div>
        </div>

        <DataContext.Consumer>
          {({ config }) => {
            return (
              <div className="container container-center">
                <p className="welcomeview__footer">
                  Здесь действуют правила поведения в общественных местах.
                  Разработано в <a href="https://roscomputing.com/">Роскомпьютинг</a>.
                  <span> Конфигурация: </span>
                  <span> name - {config.name},</span>
                  <span> description - {config.description},</span>
                  <span> version - {config.version}.</span>
                </p>
              </div>
            )
          }}
        </DataContext.Consumer>        
      </div>
    )
  }
}

export default withRouter(WelcomeView);
