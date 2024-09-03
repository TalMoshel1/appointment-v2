import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  colors: {
    background: "transparent",
    navBackground: "#0B0C10",
    navBorder: '#2E3A46',
    navText: '#66FCF1',

    eventBackgroundColor: '#38B2AC',
    dropDownBackground: '#1F2833',
    dropDownText: '#C5C6C7',
    dropDownTextActiveHover: '#2E3A46',
    dropDownBackgroundActiveHover: '#38B2AC',

    calendarHeaderBackgroundColor: '#1F2833',
    calendarHeaderColor: '#C5C6C7', /* or #66FCF1 */
    calendarHeaderBorder: '#38B2AC',

    calendarButtonBackgroundColor: '#66FCF1',
    calendarButtonBackgroundColorHover: '#38B2AC',
    calendarButtonColor: '#0B0C10',

    borderColor: "#262628",
    itemBackground: "#F5F5F5",
    lettersSmall: "#787878",
    lettersBig: "#212121",
    toggleHover: "white",
    stroke: "white",
    fill: "black",
    sliderBtn: "rgb(0, 0, 0, 0.2)",
  },
  toggleTransform: "translateX(0)",
  mobile: "768px",
  darkmode: false,
};

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
      setDarkTheme(state) {
        state.colors.background = "#000000";
        state.colors.headerBackground = "#1E1E1E";
        state.colors.borderColor = "#262628";
        state.colors.itemBackground = "#1E1E1E";
        state.colors.lettersSmall = "#A2A2A2";
        state.colors.lettersBig = "#E1E1E1";
        state.colors.toggleHover = "#000000";
        state.toggleTransform = "translateX(30px)";
        state.colors.stroke = "black";
        state.colors.fill = "white";
        state.colors.sliderBtn = "rgba(255, 255, 255, 0.5)";
        state.darkmode = true;
      },
      setDefaultTheme(state) {
        state.colors.background = "transparent";
        state.colors.headerBackground = "#4285F4";
        state.colors.borderColor = "#262628";
        state.colors.itemBackground = "#F5F5F5";
        state.colors.lettersSmall = "#787878";
        state.colors.lettersBig = "#212121";
        state.colors.toggleHover = "#FFFFFF";
        state.toggleTransform = "translateX(0)";
        state.colors.stroke = "white";
        state.colors.fill = "black";
        state.colors.sliderBtn = "rgb(0, 0, 0, 0.2)";
        state.darkmode = false;
      },
      setbackground(state, action) {},
    },
  });

export const { setDarkTheme, setDefaultTheme } = themeSlice.actions;
export default themeSlice.reducer;
