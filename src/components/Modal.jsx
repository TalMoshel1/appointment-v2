import React from "react";
import { useDispatch } from "react-redux";
import {
  toggleSetGroupModal,
  toggleSetPrivateModal,
  toggleSetDeleteLessonModal,
  toggleSetDetailsLessonModal
} from "../redux/calendarSlice.js";
import styled from "styled-components";
import CloseIcon from '@mui/icons-material/Close';

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  pointer-events: auto; 
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2), 0 6px 20px rgba(0, 0, 0, 0.19);
  perspective: 1000px;
  transform-style: preserve-3d;
  transition: transform 0.3s ease-in-out;
  overflow-y: auto;
  padding: 20px;
  // width: max-content;
  max-height: 80%;
    background-color: #66FCF1;
`;

const ModalHeader = styled.div`
  // display: flex;
  // justify-content: flex-end;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  position: absolute;
  right: 0;
  top: 0;
  padding:0.5rem;
  
`;

const Modal = ({ children, type, closeModal}) => {
  const dispatch = useDispatch();

  const handleClose = () => {
    if (type === "group") {
      dispatch(toggleSetGroupModal());
    } else if (type === "private") {
      dispatch(toggleSetPrivateModal());
    } else if (type === "details") {
      dispatch(toggleSetDetailsLessonModal());
    } else {
      dispatch(toggleSetDeleteLessonModal());
    }
  };


  return (
    
    <ModalContainer className="modal">
      <ModalHeader>
        <CloseButton 
        onClick={closeModal || handleClose}
        ><CloseIcon/></CloseButton>
      </ModalHeader>
      {children}
    </ModalContainer>
  );
};

export default Modal;
