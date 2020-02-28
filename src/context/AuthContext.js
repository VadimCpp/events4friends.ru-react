import React from 'react';

const defaultData = {
  userName: "Anonymous",
};

export const AuthContext = React.createContext(
  defaultData
);
