import React from 'react';

export const WelcomeBlockContainer = ({ children }) => {
  return (
    <div className="welcomeview__block">
      <div className="container container-center">
        {children}
      </div>
    </div>
  );
};
