import React, { Component } from 'react'
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
                      <div>
                        <span>TODO:</span>
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
