import React from 'react';

import './LoadingView.css';

const LoadingView = ({ loadingNumber, loadingTotal, loadingName }) => {
  return (
    <div className="loading-view">
      <div className="container">
        <p>Загружаем события...</p>
        <p>{`${loadingNumber} из ${loadingNumber} : ${loadingName}`}</p>
        <div>
          <Progress value={loadingNumber} max={loadingTotal} />
        </div>
      </div>
    </div>
  );
};

export default LoadingView;
