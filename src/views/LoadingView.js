import React, { Component } from 'react';

import Loader from '../components/loader';
import './LoadingView.css';

class LoadingView extends Component {
  render() {
    return (
      <div className="loading-view">
        <p>
          Загружаем события...
        </p>
        <p>
          {this.props.loadingNumber} из {this.props.loadingTotal} : {this.props.loadingName}
        </p>
        <p>
          <Loader
            number={this.props.loadingNumber}
            total={this.props.loadingTotal}
          />
        </p>
      </div>
    )
  }
}

export default LoadingView;
