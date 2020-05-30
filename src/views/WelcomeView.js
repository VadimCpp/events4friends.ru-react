import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import ReactStoreBadges from 'react-store-badges'
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
                        <span>Добро пожаловать в цифровое пространство, </span>
                        <button
                          className="btn btn-link btn-link-vk"
                          onClick={() => this.props.history.push('/profile')}
                        >
                          <span>{userName}</span>
                        </button>
                        <span>!</span>
                        <br />
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
            <p>Мероприятия тут:</p>

            <ButtonLink 
              to="/list" 
              icon="/icons/icon_list.png"
              title="Все мероприятия"
              style={{ 
                width: 250,
                display: 'block',
                marginRight: 'auto',
                marginLeft: 'auto',
                marginBottom: 10
              }}
            />
          </div>

          <div className="container container-center mt-4">
            <p>Сообщества (формируются):</p>

            <ButtonLink 
              to="/communities" 
              icon="/icons/icon_community.png"
              title="Все сообщества"
              style={{ 
                width: 250,
                display: 'block',
                marginRight: 'auto',
                marginLeft: 'auto',
                marginBottom: 10
              }}
            />
          </div>

          <div className="container container-center mt-4">
            <p>Услуги (формируются):</p>

            <ButtonLink 
              to="/services" 
              icon="/icons/icon_service.png"
              title="Все услуги"
              style={{ 
                width: 250,
                display: 'block',
                marginRight: 'auto',
                marginLeft: 'auto',
                marginBottom: 10
              }}
            />
          </div>
        </div>

        <div className="welcomeview__block">
          <div className="container container-center">
            <p>Выберите мессенджер для общения:</p>
            <ButtonExternalLink 
              href="https://tglink.ru/events4friends" 
              icon="/icons/telegram.png" 
              alt="telegram"
              style={{
                borderColor: "#139BD0",
                margin: 8
              }} 
            />
            <ButtonExternalLink 
              href="https://chat.whatsapp.com/DWUaZ1bsuxwJLALyvBYTt8" 
              icon="/icons/wa.png"
              alt="whatsapp"
              style={{
                borderColor: "#57BB63",
                margin: 8
              }} 
            />
            <ButtonExternalLink 
              href="https://invite.viber.com/?g2=AQBA7jF9Y7%2BXBkqTI0PoYF%2BmnEMluxPdGZy8wJQ3PRPBLT%2BMeh344RxBuBUTVc6B"
              icon="/icons/viber.png" 
              alt="viber"
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
              alt="vk"
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

        <div className="welcomeview__block">
          <div className="container container-center">
            <p>Наше мобильное приложение:</p>
            <div className="d-flex justify-content-center">
              <div className="mr-1">
                <ReactStoreBadges
                  platform={'ios'}
                  url={'https://apps.apple.com/us/app/events4friends-%D1%81%D0%BE%D0%BE%D0%B1%D1%89%D0%B5%D1%81%D1%82%D0%B2%D0%BE/id1509893426'}
                  locale={'en-us'}
                  width={120}
                />
              </div>
              <div className="ml-1">
                <ReactStoreBadges
                  platform={'android'}
                  url={'https://play.google.com/store/apps/details?id=com.roscomputing.events4friends'}
                  locale={'en-us'}
                  width={120}
                />
              </div>
            </div>
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
