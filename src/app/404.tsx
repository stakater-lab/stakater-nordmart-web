import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
`;
export const NotFound = () => (
  <Container>
    <h4>PAGE NOT FOUND</h4>
    <p>The page you are looking for does not exist</p>
  </Container>
);
