import React, { useState } from "react";
import axios from "axios";
import MessageModel from "../Components/MessageModel";
import { registerUserUrl } from "../apiDict";
import { styled } from "styled-components";
import Loader from "../Components/Loader";

const LoginButton = styled.button`
  display: inline-block;
  margin-top: 12px;
  padding: 7px 10px;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  border: none;
  color: white;
  border-radius: 7px;
  width: 100%;
  background-color: black;
  transition: background-color 0.3s, color 0.3s, border-color 0.3s;

  &:hover {
    opacity: 0.7;
  }
`;

function RegisterScreen() {
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
    <div className="container mt-2">
      <div className="row justify-content-center p-3">
        <div className="col-md-5 width">
          <div className="bs padding">
            <h1>Register</h1>
            {displayMessage.type && (
              <MessageModel
                message={displayMessage.message}
                messageType={displayMessage.type}
                onClose={() => {
                  setDisplayMessage({ type: "", message: "" });
                }}
              />
            )}
            <input
              type="text"
              className="form-control mt-2"
              placeholder="name"
              value={name}
              onChange={(e) => {
                setDisplayMessage({ type: "", message: "" });
                setName(e.target.value);
              }}
            />
            <input
              type="email"
              className="form-control mt-2"
              placeholder="email"
              value={email}
              onChange={(e) => {
                setDisplayMessage({ type: "", message: "" });
                setEmail(e.target.value);
              }}
            />
            <input
              type="password"
              className="form-control mt-2"
              placeholder="password"
              value={password}
              onChange={(e) => {
                setDisplayMessage({ type: "", message: "" });
                setPassword(e.target.value);
              }}
            />
            <input
              type="password"
              className="form-control mt-2"
              placeholder="confirm password"
              value={cPassword}
              onChange={(e) => {
                setDisplayMessage({ type: "", message: "" });
                setCPassword(e.target.value);
              }}
            />

            <LoginButton
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
              {loading ? <Loader size={"5px"} color={"white"} /> : "Register"}
            </LoginButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterScreen;
