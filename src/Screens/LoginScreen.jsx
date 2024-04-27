import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MessageModel from "../Components/MessageModel";
import { getUserUrl } from "../apiDict";
import Loader from "../Components/Loader";
import { styled } from "styled-components";
import { connect } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import { loginUser } from "../Store/Slices/userSlice";
import { IoMdArrowRoundBack } from "react-icons/io";

const ButtonContainer = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: end;
  margin-top: 4px;
  width: 80%;
`;

const LoginButton = styled.button`
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

const AnimatedText = styled.div`
  animation-name: my-animation;
  animation-duration: 2s;
  animation-direction: alternate;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  font-size: 6rem;
  position: absolute;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  padding: 3rem;

  @keyframes my-animation {
    from {
      color: gray;
      top: 3rem;
    }
    to {
      color: white;
      top: 8rem;
    }
  }
`;

function LoginScreen({
  userFirstName,
  userEmail,
  userId,
  userProfileImage,
  loginUser,
  onClickBack,
}) {
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
        loginUser(response.data.data);
        navigate("/home");
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
        <Title>Login</Title>
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
        type="email"
        className="form-control mt-2"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        className="form-control mt-2"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <ButtonContainer>
        <ClearButton
          onClick={() => {
            setEmail("");
            setPassword("");
          }}
          disabled={loading}
        >
          Clear
        </ClearButton>
        <LoginButton onClick={() => checkUser()} disabled={loading}>
          {loading ? <Loader size={"5px"} color={"black"} /> : "Login"}
        </LoginButton>
      </ButtonContainer>
    </Container>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: bindActionCreators(loginUser, dispatch),
  };
};

const mapStateToProps = (state) => {
  return {
    userFirstName: state.user.firstName,
    userLastName: state.user.lastName,
    userEmail: state.user.email,
    userId: state.user.userId,
    userProfileImage: state.user.profileImage,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
