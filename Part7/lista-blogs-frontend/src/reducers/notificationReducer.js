const notificationReducer = (state = null, action) => {
    switch (action.type) {
      case 'SET_NOTIFICATION':
        return action.message;
      case 'CLEAR_NOTIFICATION':
        return null;
      default:
        return state;
    }
  };
  
  export const setNotification = (message, time) => {
    return async (dispatch) => {
      dispatch({
        type: 'SET_NOTIFICATION',
        message,
      });
  
      setTimeout(() => {
        dispatch({
          type: 'CLEAR_NOTIFICATION',
        });
      }, time * 1000);
    };
  };
  
  export default notificationReducer;
  