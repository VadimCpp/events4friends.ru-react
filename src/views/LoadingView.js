import React, { Component } from 'react';

import Spinner from '../components/spinner';
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
          <Spinner />
        </p>
      </div>
    )
  }
}

export default LoadingView;
