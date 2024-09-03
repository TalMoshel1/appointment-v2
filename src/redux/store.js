import { configureStore } from '@reduxjs/toolkit';
import calendarReducer from './calendarSlice';
import themeReducer from './themeSlice';
import menuReducer from './menuReducer.js';

const store = configureStore({
  reducer: {
    calendar: calendarReducer,
    theme: themeReducer,
    menu: menuReducer
  },
});

export default store;
