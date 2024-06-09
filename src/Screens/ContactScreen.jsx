import React, { useState } from "react";
import { styled } from "styled-components";
import Loader from "../Components/Loader";
import axios from "axios";
import { messageByMailApi } from "../apiDict";
import { bindActionCreators } from "@reduxjs/toolkit";
import { connect } from "react-redux";
import { loginUser, logoutUser } from "../Store/Slices/userSlice";
import { FaPhoneAlt } from "react-icons/fa";
import { TfiEmail } from "react-icons/tfi";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const OuterContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  height: 70vh;
`;

const InnerContainer = styled.div`
  display: grid;
  grid-template-rows: 12fr 1fr;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  margin: 18px;
  background-color: rgb(204, 204, 204, 0.6);
  border-radius: 8px;
  width: 80%;
  min-width: 600px;
  min-height: 80%;
`;

const AboutText = styled.div`
  font-size: large;
  color: black;
  padding: 40px;
  width: 50%;
  text-align: left;
  p {
    margin-bottom: 1rem;
    line-height: 1.5;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
`;

const EmailContainer = styled.div`
  width: 45%;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
`;

const TopHeading = styled.h2`
  font-size: 3rem;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 12px 0px;
`;

const CustomInputContainer = styled.input`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 42px;
  background: none;
  border: none;
  border: 1px solid black;
  color: white;
  border-radius: 0px;

  &::placeholder {
    color: white;
    opacity: 0.5;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
    background: none;
    color: white;
    border: 2px solid black;
  }
`;

const SubmitButton = styled.button`
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
  width: 100%;
  background-color: black;
  transition: background-color 0.3s, color 0.3s, border-color 0.3s;

  &:hover {
    opacity: 0.7;
  }
`;

const CustomForm = styled.form`
  flex-direction: column;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin: 60px;
  gap: 12px;
`;

const CustomTexAreaContainer = styled.textarea`
  padding: 12px;
  font-size: larger;
  color: white;
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  border: 1px solid black;
  border-radius: 0px;

  &::placeholder {
    color: white;
    opacity: 0.5;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
    background: none;
    color: white;
    border: 2px solid black;
  }
`;
const NameContainer = styled.div`
  display: flex;
  gap: 12px;
  width: 100%;
`;

const Header = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 9fr;
`;

function ContactScreen({}) {
  const [dataState, setDataState] = useState("not-set");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setDataState("loading");

      const response = await axios.post(messageByMailApi, {
        firstName,
        lastName,
        email,
        message,
      });

      if (response.data.ok) {
        setFirstName("");
        setLastName("");
        setEmail("");
        setMessage("");
        setDataState("success");
      } else {
        setDataState("error");
      }
    } catch (error) {
      setDataState("error");
    }
  };

  return (
    <OuterContainer>
      <InnerContainer>
        <Container>
          <AboutText>
            <Header>
              <IoMdArrowRoundBack
                size={40}
                style={{
                  color: "black",
                  cursor: "pointer",
                }}
                onClick={() => {
                  navigate("/home");
                }}
              />
              <TopHeading>Contact Us</TopHeading>
            </Header>
            <p>
              Contact us anytime!
              <br />
              <TfiEmail /> apcode15@gmail.com (24-hour response time)
              <br />
              <FaPhoneAlt /> +91 8218276462 (Mon - Fri, 9:00am - 5:00pm ET)
              <br />
            </p>
            <TopHeading style={{ fontSize: "20px" }}>
              Thank you for choosing CRUD Drive!
            </TopHeading>
          </AboutText>
          <EmailContainer>
            <CustomForm onSubmit={handleSubmit}>
              <NameContainer>
                <CustomInputContainer
                  type="text"
                  className="form-control"
                  placeholder={"First Name"}
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />

                <CustomInputContainer
                  type="text"
                  className="form-control"
                  placeholder={"Last Name"}
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </NameContainer>

              <CustomInputContainer
                type="email"
                className="form-control"
                placeholder={"Email"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <CustomTexAreaContainer
                type="textarea"
                className="form-control"
                placeholder={"What can we help you with?"}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <SubmitButton type="submit" disabled={dataState === "loading"}>
                {dataState === "loading" ? (
                  <Loader size={"5px"} color={"white"} />
                ) : (
                  "Send"
                )}
              </SubmitButton>
            </CustomForm>
          </EmailContainer>
        </Container>
        <Container
          style={{ background: "black", borderRadius: "0px 0px 8px 8px" }}
        />
      </InnerContainer>
    </OuterContainer>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: bindActionCreators(loginUser, dispatch),
    logoutUser: bindActionCreators(logoutUser, dispatch),
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

export default connect(mapStateToProps, mapDispatchToProps)(ContactScreen);
