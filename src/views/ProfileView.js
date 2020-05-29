import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Button from '../components/Button'
import ButtonExternalLink from '../components/ButtonExternalLink'
import { AuthContext } from '../context/AuthContext'
import "firebase/auth";

class ProfileView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      displayName: '',
    }
  }

  handleDisplayNameChange = (e) => {
    this.setState({ displayName: e.target.value });
  }

  render() {
    let { displayName } = this.state;

    return (
      <div className="loginview">
        <div className="loginview__block">
        <AuthContext.Consumer>
            {({ user }) => {
              let userAuthorized = false
              if (user) {
                const { isAnonymous } = user;
                if (user.displayName && !displayName) {
                  displayName = user.displayName;
                }
                if (isAnonymous) {
                  this.props.history.push('/signin');
                } else {
                  userAuthorized = true;
                } 
              }

              return (
                <div className="container container-center">
                  { userAuthorized ? (
                      <div>
                        <p>
                          <span>
                            Заполните, пожалуйста, профиль. <br />
                            Имя будет отображено в анонсах Ваших мероприятий.
                          </span>
                        </p>
                        <div className="textinput">
                          <label>
                            <span className="textinput__label">
                              ФИО:
                            </span>
                            <input
                              className="textinput__input"
                              type="text"
                              id="displayName"
                              name="displayName"
                              value={displayName}
                              onChange={this.handleDisplayNameChange}
                            />
                          </label>
                        </div>
                        <Button
                          onPress={() => {
                            if (!displayName) {
                              alert('Заполните пожалуйста профиль');
                            } else {
                              alert('todo');
                            }
                            
                          }}
                          icon="/icons/icon_arrow_back.png"
                        >
                          Сохранить и продолжить
                        </Button>
                      </div>
                    ) : (
                      <div>
                        <p>Подождите...</p>
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
              Пожалуйста, заполните свой профиль. Если Вам не понятно, как это сделать, задайте вопрос в чат.
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

export default withRouter(ProfileView);
