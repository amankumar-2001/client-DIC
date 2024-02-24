import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { IoIosCloseCircleOutline } from "react-icons/io";

const MessageContainer = styled.div`
  position: fixed;
  top: 24px;
  left: 50%;
  display: flex;
  flex-direction: column;
  transform: translateX(-50%);
  border-radius: 12px 12px 0px 0px;
  background-color: ${({ messageType }) =>
    messageType === "error"
      ? "rgba(80, 0, 0, 0.7)"
      : messageType === "warning"
      ? "rgba(128, 128, 0, 0.7)"
      : messageType === "success"
      ? "rgba(0, 128, 0, 0.7)"
      : ""};
  color: ${({ messageType }) =>
    messageType === "error"
      ? "red"
      : messageType === "warning"
      ? "yellow"
      : messageType === "success"
      ? "green"
      : ""};
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
  width: 50%;

  &::before {
    content: "";
    position: absolute;
    bottom: -1px;
    left: 0;
    width: ${({ timeLength }) => `${timeLength / 10}%`};
    height: 2px;
    background-color: ${({ messageType }) =>
      messageType === "error"
        ? "red"
        : messageType === "warning"
        ? "yellow"
        : messageType === "success"
        ? "green"
        : ""};
    z-index: 1;
  }
`;

function MessageModel({ message, messageType, onClose }) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (seconds < 10) {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }
    }, 1);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    if (seconds >= 1000) {
      onClose();
    }
  }, [seconds]);

  return (
    <MessageContainer
      messageType={messageType}
      timeLength={Math.min(1000, seconds)}
    >
      <IoIosCloseCircleOutline
        style={{ alignSelf: "end", cursor: "pointer" }}
        onClick={onClose}
      />
      {message.charAt(0).toUpperCase() + message.slice(1)}
    </MessageContainer>
  );
}

export default MessageModel;
