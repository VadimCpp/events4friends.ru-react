import React, { Component } from 'react';
import { Progress } from 'reactstrap';

import './LoadingView.css';

class LoadingView extends Component {
  render() {
    return (
      <div className="loading-view">
        <div className="container">
          <p>
            Загружаем события...
          </p>
          <p>
            {this.props.loadingNumber} из {this.props.loadingTotal} : {this.props.loadingName}
          </p>
          <p>
            <Progress
              value={this.props.loadingNumber}
              max={this.props.loadingTotal}
            />
          </p>
        </div>
      </div>
    )
  }
}

export default LoadingView;
