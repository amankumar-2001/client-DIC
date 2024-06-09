import React from "react";
import styled from "styled-components";
import PulseLoader from "react-spinners/PulseLoader";
import Modal from "./Modal";

const ImageContainer = styled.div`
  text-align: center;
`;

const HardLoader = ({ loading, color, size }) => {
  return (
    <ImageContainer>
      <Modal
        isOpen={loading}
        onClose={() => {}}
        modalStyle={{ background: "none" }}
      >
        <PulseLoader
          color={color || "#fff"}
          loading={loading}
          size={size || 40}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </Modal>
    </ImageContainer>
  );
};

export default HardLoader;
