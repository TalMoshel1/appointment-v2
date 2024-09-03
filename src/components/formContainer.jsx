import React from "react"
import styled from "styled-components";


const Container = styled.main`
  // height: 95svh;
  
  @media (orientation: landscape) { 
    // margin-top:5rem;

  }

    @media (orientation: portrait) { 
      // margin-top:3rem;

  }
  align-items: center;
  justify-content: center;
`
const FormContainer = ({children}) => {
  return (
    <Container>
        {children}
    </Container>
  )
};

export default FormContainer;
