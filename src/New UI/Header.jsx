import React from "react";
import styled from "styled-components";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const HeaderContainer = styled.header`
  * {
    // border: 1px solid black;
  }
  direction: rtl;
  box-sizing: border-box;
  font-size: 0.5rem;
  background-color: #00d180;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: white;
  height:20svh;

  h2 { 
      margin-block-start: 0em;
    margin-block-end: 0em;
    font-weight: 100;
    padding-bottom: 0.5rem;
    }
`;

const Header = (props) => {
  return (
    <HeaderContainer>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          height: '15svh'
        }}
      >
        <section
          style={{
            width: "50%",
            //  marginRight: '5%', 
            // marginTop: '8%',
        
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h2>המועדון של</h2>
            <div style={{ alignContent: "center" }}>חץ</div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between",             marginTop: '8%',
 }}>
            <h2>שיעורי סטודיו</h2>
            <div>חץ</div>
          </div>
        </section>

        <section
          className="icons"
          style={{
            // marginTop: '5%', marginLeft: '5%'
            height: "fit-content",
            display:'flex',
            alignItems:'center',
            height: '10svh',
            gap: '0.5rem'


          }}
        >
          <CalendarMonthIcon />
          <SearchIcon />
          <FilterAltIcon />
          <FavoriteBorderIcon />
        </section>
      </div>

      <section style={{display: 'flex', justifyContent: 'space-evenly', width: '100%', textAlign:'center' }}>
        <h2 style={{boxSizing: 'border-box',borderBottom: '0.5rem solid white', fontSize: '1.2rem', width: '50%', textAlign:'center'}}>לו"ז</h2>
        <h2 style={{fontSize: '1.2rem', width: '50%'}}>ההרשמות שלי</h2>
      </section>
    </HeaderContainer>
  );
};

export default Header;
