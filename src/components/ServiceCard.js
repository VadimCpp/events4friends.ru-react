import React, { Component } from 'react';
import moment from 'moment';
import 'react-add-to-calendar/dist/react-add-to-calendar.css';
import { Link, withRouter } from "react-router-dom";
import 'moment/locale/ru';
import './ServiceCard.css';

class ServiceCard extends Component {
  componentDidMount() {
    moment.locale('ru');
  }

  render() {
    const { service, name } = this.props;

    return (
      <Link className="reset-link-style" to={`/service/${service.id}`}>
        <div className="border-top">
          <div className="container">
            <div className="event-item container-center">            
              <small className="calendar-name">#{name}</small>
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  {service.description}
                </div>
                <div className="button">
                  <img src={"/icons/icon_arrow_forward.png"} alt="➡️" className="button__image" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    )
  }
}


export default withRouter(ServiceCard);
