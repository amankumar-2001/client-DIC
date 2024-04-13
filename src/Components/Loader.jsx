import React, { useState } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import styled from "styled-components";

const CustomLoaderContainer = styled.div`
  text-align: center;
  align-items: center;
  margin-bottom: ${({ margin }) => margin};
`;

function Loader({ size, color, margin = 5 }) {
  let [loading] = useState(true);
  return (
    <CustomLoaderContainer margin={margin}>
      <PulseLoader
        color={color || "#000"}
        loading={loading}
        size={size || 40}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </CustomLoaderContainer>
  );
}

export default Loader;
