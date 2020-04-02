import React, { Component } from 'react'
import Button from '../components/Button'
import ButtonLink from '../components/ButtonLink'
import { AuthContext } from '../context/AuthContext'
import * as firebase from 'firebase/app';
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
      </div>
    )
  }
}

export default LoginView;
