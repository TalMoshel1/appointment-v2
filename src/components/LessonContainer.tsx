import React from "react";

import styled from "styled-components";

const Container = styled.section`
  display: flex;
  flex-direction: column;
  // gap: 1rem;
  width: 100%;

`;
const LessonsContainer = ({ children }) => {
  return <Container>{children}</Container>;
};

export default LessonsContainer;
