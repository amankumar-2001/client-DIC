import React from "react";
import styled from "styled-components";
import Modal from "./Modal";
import Loader from "./Loader";
import { TbCircleCheckFilled } from "react-icons/tb";
import { MdError } from "react-icons/md";

const ConfirmationContent = styled.div`
  background-color: white;
  border-radius: 8px;
  min-width: 350px;
`;

const Button = styled.button`
  margin-right: 10px;
  padding: 10px 20px;
  min-width: 100px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const ButtonContainer = styled.div`
  padding: 20px;
`;

const Title = styled.div`
  background-color: white;
  padding: 8px;
  border-radius: 8px;
  font-size: 40px;
`;

function ConfirmationPopup({
  title,
  message,
  closeBtnText,
  closeBtnFunction,
  confirmBtnText,
  confirmBtnFunction,
  successPopupBtnText,
  successPopupBtnFunction,
  errorPopupBtnText,
  successPopupText,
  errorPopupBtnFunction,
  state,
}) {
  return (
    <Modal isOpen={true} onClose={closeBtnFunction}>
      {state === "success" ? (
        <ConfirmationContent onClick={(e) => e.stopPropagation()}>
          <TbCircleCheckFilled size={150} style={{ color: "green" }} />
          <Title>{successPopupText ? successPopupText : "Success"}</Title>
          <ButtonContainer>
            <Button onClick={successPopupBtnFunction}>
              {successPopupBtnText}
            </Button>
          </ButtonContainer>
        </ConfirmationContent>
      ) : state === "error" || true ? (
        <ConfirmationContent onClick={(e) => e.stopPropagation()}>
          <MdError size={150} style={{ color: "#cfb815" }} />
          <Title>Error</Title>
          <ButtonContainer>
            <Button onClick={errorPopupBtnFunction}>{errorPopupBtnText}</Button>
          </ButtonContainer>
        </ConfirmationContent>
      ) : (
        <ConfirmationContent onClick={(e) => e.stopPropagation()}>
          <Title>{title}</Title>
          <p>{message}</p>
          <ButtonContainer>
            <Button onClick={closeBtnFunction}>{closeBtnText}</Button>
            <Button onClick={confirmBtnFunction}>
              {state === "loading" ? (
                <Loader size={"5px"} color={"black"} />
              ) : (
                confirmBtnText
              )}
            </Button>
          </ButtonContainer>
        </ConfirmationContent>
      )}
    </Modal>
  );
}

export default ConfirmationPopup;
