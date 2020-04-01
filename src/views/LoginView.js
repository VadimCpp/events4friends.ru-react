import React, { Component } from 'react'
import Button from '../components/Button'
import ButtonLink from '../components/ButtonLink'
import { AuthContext } from '../context/AuthContext'

import './LoginView.css'

class LoginView extends Component {
  render() {
    return (
      <div className="loginview">
        <div className="loginview__block">
        <AuthContext.Consumer>
            {({ user }) => {
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
                        <p>
                          <span>Вход выполнен, {userName}! </span>
                        </p>
                          <ButtonLink
                            to="/"
                            icon="/icons/icon_arrow_back.png"
                            title="Вернуться на эран приветствия"
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
                      <form>
                        <div className="textinput">
                          <label>
                            <span className="textinput__label">
                              E-mail:
                            </span>
                            <input className="textinput__input" type="email" id="login" name="login" />
                          </label>
                        </div>
                        <div className="textinput">
                          <label>
                            <span className="textinput__label">
                              Пароль:
                            </span>
                            <input className="textinput__input" type="password" id="password" name="password" />
                          </label>
                        </div>
                        <Button
                          onPress={() => {
                            alert('TODO: sign in')
                          }}
                          icon="/icons/icon_login.png"
                        >
                          Войти
                        </Button>
                      </form>
                    )
                  }
                </div>
              )
            }}
          </AuthContext.Consumer>
        </div>            
      </div>
    )
  }
}

export default LoginView;
