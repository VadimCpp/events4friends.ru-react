import React, { Component } from 'react';
import './LoadingView.css';

class LoadingView extends Component {
  render() {
    return (
      <div className="loading-view">
        <p>
          Загружаем события...
        </p>
        <p>
          TODO: добавить счетчик календарей
        </p>
        <p>
          TODO: добавить индикатор загрузки
        </p>
      </div>
    )
  }
}

export default LoadingView;
