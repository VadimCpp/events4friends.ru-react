import React, { Component } from 'react';
import ButtonLink from '../components/ButtonLink';
import ButtonExternalLink from '../components/ButtonExternalLink';
import { DataContext } from '../context/DataContext'
import './ServiceView.css';

class EventView extends Component {

  render() {
    const serviceId = this.props.match.params.id;

    return (
      <div>
        <div>
          <ButtonLink
            to="/services"
            icon="/icons/icon_arrow_back.png"
            title="К списку"
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
        <DataContext.Consumer>
          {({ services }) => {
            let service = null;
            for (let i = 0; i < services.length; i++) {
              if (services[i].id === serviceId) {
                service = services[i];
                break;
              }
            }

            return (
              <div className="border-top">
                <div className="container">
                  <div className="event-item container-center">
                    
                    {!service && (
                      <div>
                        <p align="center">
                          Услуга недоступна <span role="img" aria-label="sad">🙁</span>
                        </p>
                        <p align="center">
                          Попробуйте перезагрузить страницу
                        </p>
                      </div>
                    )}
                    {service && (
                      <div>
                        <h2>
                          {service.service || 'Не указано'}
                          {service.isFree && (
                            <span className="text-success"> (бесплатно)</span>
                          )}
                        </h2>
                        <p dangerouslySetInnerHTML={{ __html: service.description }} />
                        <p>
                          <span>Предоставляет услугу: </span>
                          <strong>
                            {service.name || 'Не указано'} 
                          </strong>
                        </p>
                        <p>
                          Контакты:
                        </p>
                        { service.instagram && (
                          <p>
                            Instagram: <a href={service.instagram}>{service.instagram}</a>
                          </p>
                        )}
                        { service.website && (
                          <p>
                            Сайт: <a href={service.website}>{service.website}</a>
                          </p>
                        )}
                        { service.vkontakte && (
                          <p>
                            ВКонтакте: <a href={service.vkontakte}>{service.vkontakte}</a>
                          </p>
                        )}             
                        { service.telegram && (
                          <p>
                            <ButtonExternalLink
                              href={`https://tglink.ru/${service.telegram}`}
                              icon="/icons/telegram.png"
                              style={{
                                borderColor: "#139BD0",
                                margin: 8
                              }}
                              title={service.telegram}
                            />
                          </p>
                        )}             
                        { service.whatsapp && (
                          <p>
                            <ButtonExternalLink
                              href={`https://wa.me/${service.whatsapp}?text=${encodeURI('Привет, меня интересует услуга ' + service.service + ', которую я нашел на сайте events4friends.ru')}`}
                              icon="/icons/wa.png"
                              style={{
                                borderColor: "#57BB63",
                                margin: 8
                              }}
                              title={service.whatsapp}
                            />                            
                          </p>
                        )}                        
                      </div>
                    )}
                  </div>
                </div>
              </div> 
            )
          }}
        </DataContext.Consumer> 
        
        <div className="border-top">
          <div className="container container-center pt-4 pb-5">
            <p>Обсудить услугу в чате:</p>
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
      </div>
    )
  }
}

export default EventView;
