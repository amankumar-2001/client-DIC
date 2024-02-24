import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MessageModel from "../Components/MessageModel";
import "./pos.css";
import { getUserUrl } from "../apiDict";
import Loader from "../Components/Loader";
import { styled } from "styled-components";

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

function LoginScreen({ setResetUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [displayMessage, setDisplayMessage] = useState({
    type: "",
    message: "",
  });
  const navigate = useNavigate();

  const checkUser = async () => {
    try {
      setLoading(true);
      axios.defaults.withCredentials = true;
      const response = await axios.post(getUserUrl, {
        email,
        password,
      });

      if (response.data && response.data.ok) {
        window.localStorage.setItem(
          "currentUser",
          JSON.stringify(response.data.data)
        );
        setResetUser(true);
        navigate("/data");
      } else {
        setDisplayMessage({ type: "error", message: response?.data?.message });
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setDisplayMessage({ type: "error", message: err?.message });
    }
  };

  return (
    <div className="container mt-2">
      <div className="row justify-content-center p-3">
        <div className="col-md-5 width">
          <h1>Login</h1>
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
            type="email"
            className="form-control mt-2"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="form-control mt-2"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <LoginButton onClick={() => checkUser()} disabled={loading}>
            {loading ? <Loader size={"5px"} color={"white"} /> : "Login"}
          </LoginButton>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
