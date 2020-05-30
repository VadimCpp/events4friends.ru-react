import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Button from '../components/Button'
import ButtonLink from '../components/ButtonLink'
import ButtonExternalLink from '../components/ButtonExternalLink'
import { AuthContext } from '../context/AuthContext'
import "firebase/auth";

import './LoginView.css'

class LoginView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      login: '',
      password: '',
    }
  }

  handleLoginChange = (e) => {
    this.setState({ login: e.target.value });
  }

  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value });
  }

  render() {
    const { login, password } = this.state;

    return (
      <div className="loginview">
        <div className="loginview__block">
        <AuthContext.Consumer>
            {({ user, signIn }) => {
              let userName = null
              let userAuthorized = false
              if (user) {
                const { isAnonymous, displayName } = user;
                if (isAnonymous) {
                  userName = 'Аноним'
                } else {
                  userName = displayName
                  if (!userName) {
                    this.props.history.push('/profile');
                  }
                  userAuthorized = true
                } 
              }
              return (
                <div className="container container-center">
                  { userAuthorized ? (
                      <div>
                        <p>
                          <span>Вход выполнен, {userName}! </span>
                        </p>
                          <ButtonLink
                            to="/"
                            icon="/icons/icon_arrow_back.png"
                            title="Вернуться на экран приветствия"
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
                    ) : (
                      <div>
                        <div className="textinput">
                          <label>
                            <span className="textinput__label">
                              E-mail:
                            </span>
                            <input
                              className="textinput__input"
                              type="email"
                              id="login"
                              name="login"
                              value={login}
                              onChange={this.handleLoginChange}
                            />
                          </label>
                        </div>
                        <div className="textinput">
                          <label>
                            <span className="textinput__label">
                              Пароль:
                            </span>
                            <input
                              className="textinput__input"
                              type="password"
                              id="password"
                              name="password"
                              value={password}
                              onChange={this.handlePasswordChange}
                            />
                          </label>
                        </div>
                        <Button
                          onPress={() => {
                            signIn(login, password)
                          }}
                          icon="/icons/icon_login.png"
                        >
                          Войти
                        </Button>
                      </div>
                    )
                  }
                </div>
              )
            }}
          </AuthContext.Consumer>
        </div> 
        <div className="loginview__block">
          <div className="container container-center">
            <p>
              Вход в систему дает возможность создавать услуги и мероприятия.
              Логин и пароль можно получить в одном из чатов:
            </p>
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
      </div>
    )
  }
}

export default withRouter(LoginView);
