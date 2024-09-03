import React, { useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Navbar from "./components/Navbar";
import Calendar from "./pages/Calendar";
import DeleteLesson from "./components/deleteLesson";
import DetailsLesson from './components/detailsLesson';
import Modal from "./components/Modal";
import SignIn from "./pages/SignIn";
import ApproveLink from "./pages/ApprovalLink";
import SetGroupLesson from "./pages/setGroupLesson";
import "./App.css";
import { useSelector } from "react-redux";
import Home from "./pages/Home";
import RequestPrivateLesson from "./pages/requestPrivate";
import FormContainer from "./components/formContainer";
import MenuList from "./components/MenuList";
import { MenuProvider } from "./context/useMenu";
import styled from "styled-components";
import DateSliderDays from "./components/DateSliderDays";
import DateSliderWeeks from "./components/DateSliderWeeks";

import Private2 from './pages/Private2'
import { PrivateForm } from "./pages/Private3";
import Group2 from "./pages/Group2";

function App() {
  const theme = useSelector((state) => state.theme);

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <MenuProvider>
          <AppContent />
        </MenuProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

function AppContent() {
  const [isMenuOpen, toggleMenu] = useState(false);

  const handleToggleMenu = () => {
    toggleMenu(!isMenuOpen);
  };

  const isDeleteLessonModalOpen = useSelector(
    (state) => state.calendar.isDeleteLessonModalOpen
  );

  const isDetailsLessonModalOpen = useSelector(
    (state) => state.calendar.isDetailsLessonModalOpen
  );

  return (
    <VerticalContainer>
      <MenuList isMenuOpen={isMenuOpen} handleToggleMenu={handleToggleMenu} />
      <Navbar isMenuOpen={isMenuOpen} handleToggleMenu={handleToggleMenu} />
      {isDeleteLessonModalOpen && (
        <Modal type="delete">
          <DeleteLesson />
        </Modal>
      )}

      {isDetailsLessonModalOpen && (
        <Modal type="details">
          <DetailsLesson />
        </Modal>
      )}
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/signin" element={<SignIn />} />
        <Route
          path="/calendar"
          element={
            <StyledDisabledWrapper 
            isDisabled={
              isDeleteLessonModalOpen || isDetailsLessonModalOpen
              }
              >
              <Calendar />
            </StyledDisabledWrapper>
          }
        />
        <Route
          path="/setgrouplesson"
          element={
            <FormContainer>
              <Group2 />
            </FormContainer>
          }
        />
        <Route path="/approveLink/:lessonId" element={<ApproveLink />} />
        <Route path="/home" element={<Home />} />
        <Route
          path="/requestPrivte"
          element={
            <FormContainer>
              {/* <RequestPrivateLesson /> */}
              <Private2/>
            </FormContainer>
          }
        />
        <Route path="/datesliderdays" element={<DateSliderDays />} />
        <Route path="/datesliderweeks" element={<DateSliderWeeks />} />
      </Routes>
    </VerticalContainer>
  );
}

export const DisabledWrapper = ({ isDisabled, children, ...props }) => (
  <div {...props}>{children}</div>
);

export const StyledDisabledWrapper = styled(DisabledWrapper)`
  ${({ isDisabled }) =>
    isDisabled &&
    `
    opacity: 0.5;
    pointer-events: none;
    width: 100vw;
  `}
`;

const VerticalContainer = styled.div`
  flex: 1; 
  display: flex;
  max-width: 100vw;
  flex-direction: column;
  min-height: 100svh;
  overflow: hidden;
`;

export default App;