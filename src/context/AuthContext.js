/* eslint-disable no-unused-vars */
import React from 'react';

const defaultData = {
  user: undefined, // object or undefined - текущий авторизованный пользователь firebase
  signIn: (email, password) => {}, // метод вход пользователя по логину и паролю
  signOut: () => {}, // метод осуществляет выход пользователя из системы
  updateProfile: displayName => {}, // метод обновляет имя пользователя
  connectingToFirebase: true, // флаг, который обозначает процесс подключения к базе firebase
};

export const AuthContext = React.createContext(defaultData);
