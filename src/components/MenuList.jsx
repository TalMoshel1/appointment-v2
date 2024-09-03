import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Item = styled.li`
  color: ${(props) => props.theme.colors.dropDownText};
  background-color: #ffffff;
  padding: 2rem;
  all: unset;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;
  height: 100%;

  &:hover, &:active{
    color: ${(props) => props.theme.colors.dropDownTextActiveHover};
  }

    h2 { 
      padding: 1rem;
  }

  @media (orientation: landscape) {
  width: 25%
  }

  @media (orientation: portrait) { 

  width: max-content;
  }

  h2 {
    all: unset;
  }
`;

const MenuList = () => {
  const navigate = useNavigate();

  const handleClick = (endpoint) => {
    navigate(`/${endpoint}`);
  };

    return (
      <StyledMenuList
      // initial={{ y: "-100vh" }} 
      // animate={{ y: isMenuOpen ? 0 : "-100vh" }} 
      // transition={{ duration: 0.4, ease: "easeOut" }} 
      >
        <Item onClick={() => handleClick("calendar")}>
          <h2 style={{ fontSize: "1rem" }}>מערכת שעות</h2>
        </Item>
        <Item onClick={() => handleClick("requestPrivte")}>
          <h2 style={{ fontSize: "1rem", padding: "1rem", flexGrow: '1' }}>
            בקש לקבוע שיעור פרטי
          </h2>
        </Item>
        <Item>
          <h2 style={{ fontSize: "1rem", padding: "1rem" }} onClick={()=> handleClick('')}>דף הבית</h2>
        </Item>
        <Item onClick={() => handleClick("setgrouplesson")}>
          <h2 style={{ fontSize: "1rem", padding: "1rem" }}>ניהול</h2>
        </Item>
      </StyledMenuList>
    );
  
};

const StyledMenuList = styled(motion.ul)`
  &:hover{
    background-color: ${(props) => props.theme.colors.dropDownBackgroundActiveHover};
  }
  background-color: #ffffff;
  width: 100%;
  height:10svh;
  display: flex;
  align-items: center;
  z-index: 1; /* Ensure it is above other content */
  overflow-y: auto;
  position:absolute;
  bottom: 0px;
  padding-inline-start: 0px;
  margin-block-start: 0em;
  margin-block-end: 0em;
`;

export default MenuList;
