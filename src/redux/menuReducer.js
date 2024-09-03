import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isMenulOpen: false,
};

const MenuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    toggle: (state, action) => {
      state.isMenulOpen = !state.isMenulOpen;
    }
  },
});

export const {toggle} = MenuSlice.actions;
export default MenuSlice.reducer;