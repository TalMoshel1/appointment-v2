import { configureStore } from '@reduxjs/toolkit';
import menuReducer from './menuReducer.js';

const store = configureStore({
  reducer: {
    menu: menuReducer
  },
});

export default store;
