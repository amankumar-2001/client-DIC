import React from "react";
import styled from "styled-components";

const Main = styled.div`
  border: 2px solid green;
  border-radius: 5px;
  padding: 5px;
  color: white;
  background: green;
  opacity: 0.5;
`;

function SuccessModal({successMessage}) {
  return (
    <Main>{successMessage}</Main>
  )
}

export default SuccessModal