import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDarkTheme, setDefaultTheme } from "../redux/themeSlice.js"; // Correctly import actions



export const ToggleTheme = () => {
  const theme = useSelector((state) => state.theme);

  const dispatch = useDispatch();

  const handleToggle = () => {
    if (!theme.darkmode) {
      return dispatch(setDarkTheme())
    } 
    return dispatch(setDefaultTheme());
  };


  return (
    <button onClick={handleToggle}>Toggle Theme</button>
  );
};

