import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginScreen from "./LoginScreen";
import RegisterScreen from "./RegisterScreen";
import { connect } from "react-redux";
import { keyframes, styled } from "styled-components";
import { GoSignOut } from "react-icons/go";
import { bindActionCreators } from "@reduxjs/toolkit";
import { logoutUser } from "../Store/Slices/userSlice";
import { IoPersonRemoveSharp } from "react-icons/io5";
import { MdOutlineAccountCircle } from "react-icons/md";
import { IoPersonAdd } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BarWrap = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  background-color: #000;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  flex-wrap: wrap;
  border-radius: 6px;
  width: 1000px;
  margin: 24px;
`;

const LeftContainer = styled.div`
  flex: 1;
  margin-left: 3rem;
  min-width: 330px;
`;

const Operation = styled.div`
  color: white;
  font-size: 5rem;
  text-align: left;
  font-weight: bolder;
  text-transform: uppercase;
  background-image: linear-gradient(
    -225deg,
    #ffffff 0%,
    #ffffff 29%,
    #000000 67%,
    #909090 100%
  );
  background-size: auto auto;
  background-clip: border-box;
  background-size: 200% auto;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${keyframes`
    to {
      background-position: 200% center;
    }
  `} 2s linear infinite;
`;

const RightContainer = styled.div`
  flex: 1;
  min-width: 330px;
  margin: 30px 0px;
`;

const DashboardLink = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
`;

const DashboardText = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
`;

const StyledLink = styled.div`
  color: white;
  height: auto;
  border-bottom: 1px solid white;
  min-height: 58px;
  width: 80%;
  border-radius: 6px;
  display: flex;
  justify-content: flex-start;
  gap: 12px;
  align-items: center;
  cursor: pointer;

  &:hover {
    background: rgb(233, 234, 236, 0.2);
  }
`;

const ImagePreview = styled.img`
  width: 46px;
  height: 46px;
  padding: 4px;
  border-radius: 50%;
  object-fit: cover;
  margin: 6px;
`;

function HomeScreen({
  resetUser,
  setResetUser,
  userId,
  userProfileImage,
  userFirstName,
  userEmail,
  logoutUser,
}) {
  const [action, setAction] = useState("");
  const navigate = useNavigate();

  return (
    <Container>
      <BarWrap>
        <LeftContainer className="container left">
          <Operation>Create</Operation>
          <Operation>Read</Operation>
          <Operation>Update</Operation>
          <Operation>Delete</Operation>
        </LeftContainer>
        <RightContainer className="container right">
          {userId ? (
            <DashboardLink>
              <StyledLink
                onClick={() => {
                  navigate("/home");
                }}
              >
                {userProfileImage ? (
                  <ImagePreview src={userProfileImage} alt="Image Preview" />
                ) : (
                  <FaUserCircle
                    size={45}
                    style={{
                      marginLeft: "6px",
                      padding: "4px",
                      color: "white",
                    }}
                  />
                )}

                <DashboardText>
                  <p style={{ margin: "0px", textAlign: "left" }}>
                    {userFirstName}
                  </p>
                  <p style={{ margin: "0px", textAlign: "left" }}>
                    {userEmail}
                  </p>
                </DashboardText>
              </StyledLink>
              <StyledLink
                onClick={() => {
                  logoutUser();
                  setAction("login");
                }}
              >
                <MdOutlineAccountCircle
                  size={50}
                  style={{ marginLeft: "6px", padding: "4px", color: "white" }}
                />
                Use another account
              </StyledLink>
              {false && (
                <StyledLink
                  onClick={() => {
                    logoutUser();
                  }}
                >
                  <IoPersonRemoveSharp
                    size={40}
                    style={{
                      marginLeft: "12px",
                      padding: "4px",
                      color: "white",
                    }}
                  />
                  Remove Account
                </StyledLink>
              )}
              <StyledLink
                onClick={() => {
                  logoutUser();
                }}
              >
                <GoSignOut
                  size={40}
                  style={{
                    marginLeft: "12px",
                    padding: "4px",
                    color: "white",
                  }}
                />
                Signed out
              </StyledLink>
            </DashboardLink>
          ) : action === "login" ? (
            <DashboardLink>
              <LoginScreen
                onClickBack={() => {
                  setAction("");
                }}
              />
            </DashboardLink>
          ) : action === "register" ? (
            <DashboardLink>
              <RegisterScreen
                onClickBack={() => {
                  setAction("");
                }}
              />
            </DashboardLink>
          ) : (
            <DashboardLink>
              <StyledLink
                onClick={() => {
                  setAction("login");
                }}
              >
                <MdOutlineAccountCircle
                  size={50}
                  style={{ marginLeft: "6px", padding: "4px", color: "white" }}
                />
                Sign In
              </StyledLink>
              <StyledLink
                onClick={() => {
                  setAction("register");
                }}
              >
                <IoPersonAdd
                  size={40}
                  style={{
                    marginLeft: "12px",
                    padding: "4px",
                    color: "white",
                  }}
                />
                Create Account
              </StyledLink>
            </DashboardLink>
          )}
        </RightContainer>
      </BarWrap>
    </Container>
  );
}

const mapDispatchToProps = (dispatch) => {
  return { logoutUser: bindActionCreators(logoutUser, dispatch) };
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
