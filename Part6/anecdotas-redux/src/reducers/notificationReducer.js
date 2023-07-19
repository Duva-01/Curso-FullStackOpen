import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    showNotification(_state, action) {
      return action.payload;
    },
    removeNotification() {
      return null;
    },
  },
});

let timeoutId;
export const showTimedNotification =
  (content, timeout = 5) =>
  (dispatch) => {
    clearTimeout(timeoutId);
    dispatch(showNotification(content));
    timeoutId = setTimeout(
      () => dispatch(removeNotification()),
      timeout * 1000
    );
  };

export const { showNotification, removeNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;