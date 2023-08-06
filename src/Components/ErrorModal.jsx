import React from "react";
import styled from "styled-components";

const Main = styled.div`
  border: 2px solid red;
  border-radius: 5px;
  padding: 5px;
  color: white;
  background: red;
  opacity: 0.5;
`;

function ErrorModal({ errorMessage }) {
  return <Main className="container">{errorMessage}</Main>;
}

export default ErrorModal;
