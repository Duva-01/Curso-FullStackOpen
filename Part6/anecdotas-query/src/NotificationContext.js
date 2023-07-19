import React, { createContext, useContext, useReducer } from 'react';

const NotificationContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification;
    case 'CLEAR_NOTIFICATION':
      return null;
    default:
      throw new Error(`Unsupported action type: ${action.type}`);
  }
};

export const NotificationProvider = ({ children }) => {
  const [notification, dispatch] = useReducer(reducer, null);

  const setNotification = (notification) => {
    dispatch({ type: 'SET_NOTIFICATION', notification });
    setTimeout(() => {
      dispatch({ type: 'CLEAR_NOTIFICATION' });
    }, 5000);
  };

  const value = { notification, setNotification };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};
