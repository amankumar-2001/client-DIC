import React, { useState } from "react";
import axios from "axios";
import MessageModel from "../Components/MessageModel";
import { registerUserUrl } from "../apiDict";
import { styled } from "styled-components";
import Loader from "../Components/Loader";
import { IoMdArrowRoundBack } from "react-icons/io";

const ButtonContainer = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: end;
  margin-top: 4px;
  width: 80%;
`;

const RegisterButton = styled.button`
  display: inline-block;
  padding: 7px 14px;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  border: none;
  color: black;
  border-radius: 50px;
  min-width: 92px;
  background-color: white;
  transition: background-color 0.3s, color 0.3s, border-color 0.3s;

  &:hover {
    opacity: 0.7;
  }
`;

const ClearButton = styled.button`
  display: inline-block;
  padding: 7px 14px;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  border: none;
  color: white;
  border-radius: 50px;
  min-width: 92px;
  border: 2px solid white;
  background-color: black;
  transition: background-color 0.3s, color 0.3s, border-color 0.3s;

  &:hover {
    opacity: 0.7;
  }
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: white;
  width: 80%;
`;

const Input = styled.input`
  width: 80%;
  color: white;
  margin-top: 1rem;
  background: black;
  height: 48px;
  border: none;
  border-bottom: 1px solid white;

  &:focus {
    outline: none;
    box-shadow: 0 0 5px rgba(233, 234, 236, 0.5);
    background: none;
    color: white;
    border-bottom: 2px solid white;
  }
`;

function RegisterScreen({ onClickBack }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [displayMessage, setDisplayMessage] = useState({
    type: "",
    message: "",
  });

  const registerUser = async () => {
    setLoading(true);
    try {
      const response = await axios.post(registerUserUrl, {
        name,
        email,
        password,
      });
      if (response.data && response.data.ok) {
        setDisplayMessage({
          type: "success",
          message: "Registered Successfully",
        });
        onClickBack();
      } else {
        setDisplayMessage({ type: "error", message: response.data.message });
      }
    } catch (err) {
      setDisplayMessage({
        type: "error",
        message: err?.response?.data?.message,
      });
    }
    setLoading(false);
  };

  return (
    <Container className="col-md-5">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          justifyContent: "center",
        }}
      >
        <IoMdArrowRoundBack
          size={50}
          style={{
            marginLeft: "6px",
            padding: "4px",
            color: "white",
            cursor: "pointer",
          }}
          onClick={onClickBack}
        />
        <Title>Register</Title>
      </div>
      {displayMessage.type && (
        <MessageModel
          message={displayMessage.message}
          messageType={displayMessage.type}
          onClose={() => {
            setDisplayMessage({ type: "", message: "" });
          }}
        />
      )}
      <Input
        type="text"
        className="form-control mt-2"
        placeholder="name"
        value={name}
        onChange={(e) => {
          setDisplayMessage({ type: "", message: "" });
          setName(e.target.value);
        }}
      />
      <Input
        type="email"
        className="form-control mt-2"
        placeholder="email"
        value={email}
        onChange={(e) => {
          setDisplayMessage({ type: "", message: "" });
          setEmail(e.target.value);
        }}
      />
      <Input
        type="password"
        className="form-control mt-2"
        placeholder="password"
        value={password}
        onChange={(e) => {
          setDisplayMessage({ type: "", message: "" });
          setPassword(e.target.value);
        }}
      />
      <Input
        type="password"
        className="form-control mt-2"
        placeholder="confirm password"
        value={cPassword}
        onChange={(e) => {
          setDisplayMessage({ type: "", message: "" });
          setCPassword(e.target.value);
        }}
      />

      <ButtonContainer>
        <ClearButton
          onClick={() => {
            setEmail("");
            setPassword("");
            setCPassword("");
            setName("");
          }}
          disabled={loading}
        >
          Clear
        </ClearButton>
        <RegisterButton
          disabled={loading}
          onClick={() => {
            password === cPassword
              ? registerUser()
              : setDisplayMessage({
                  type: "error",
                  message: "Password Not Matched...",
                });
          }}
        >
          {loading ? <Loader size={"5px"} color={"black"} /> : "Register"}
        </RegisterButton>
      </ButtonContainer>
    </Container>
  );
}

export default RegisterScreen;
