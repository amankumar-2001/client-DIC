import React, { useEffect, useRef, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { styled } from "styled-components";
import { MdError, MdOutlineModeEditOutline } from "react-icons/md";
import Loader from "../Components/Loader";
import axios from "axios";
import { editProfileUrl } from "../apiDict";
import { IoIosEyeOff, IoMdArrowRoundBack } from "react-icons/io";
import { IoEyeSharp } from "react-icons/io5";
import { FaUserLock } from "react-icons/fa";
import Modal from "../Components/Modal";
import { useNavigate } from "react-router-dom";
import { TbCircleCheckFilled } from "react-icons/tb";
import { bindActionCreators } from "@reduxjs/toolkit";
import { connect } from "react-redux";
import { loginUser, logoutUser } from "../Store/Slices/userSlice";

const OuterContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  height: 70vh;
`;

const InnerContainer = styled.div`
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  background-color: rgb(204, 204, 204, 0.6);
  border-radius: 8px;
  width: 600px;
  min-width: 600px;
  min-height: 80%;
`;

const EditProfileImage = styled.div`
  display: flex;
  flex-wrap: wrap;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: center;
  position: relative;
`;

const PrevPasswordContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  align-items: center;
`;

const EditIconContainer = styled.div`
  display: flex;
  width: 40px;
  height: 40px;
  background: white !important;
  z-index: 12;
  position: absolute;
  top: 144px;
  right: 124px;
  justify-content: center;
  border-radius: 20px;
  align-items: center;
  cursor: pointer;
`;

const TopHeading = styled.h2`
  font-size: 1.5rem;
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
  height: 100%;
  background: none;
  border: none;
  border-bottom: 1px solid black;
  border-radius: 8px 8px 0px 0px;
  margin: 14px 0px;
  color: white;

  &::placeholder {
    color: white;
    opacity: 0.5;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
    background: none;
    color: white;
    border-bottom: 2px solid black;
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
  border-radius: 7px;
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
  margin: 0px 60px;
  justify-content: space-evenly;
  align-items: center;
  margin: 0px 60px;
`;

const Message = styled.div`
  font-size: 14px;
  color: red;
`;

const ImageComponent = styled.input`
  width: 100%;
  margin: 12px 0px 0px 0px;
  display: none;
`;

const ImagePreview = styled.img`
  width: 200px;
  height: 200px;
  padding: 4px;
  border-radius: 50%;
  object-fit: cover;
`;

const SubmitButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 16px 0px;
`;

const ClearButton = styled.button`
  display: inline-block;
  margin-top: 12px;
  padding: 7px 10px;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  border: none;
  color: black;
  border-radius: 7px;
  width: 30%;
  background-color: white;
  transition: background-color 0.3s, color 0.3s, border-color 0.3s;
  border: 1px solid black;

  &:hover {
    opacity: 0.5;
  }
`;

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

const Header = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 9fr;
`;

function EditProfileScreen({
  userFirstName,
  userLastName,
  userEmail,
  userId,
  userProfileImage,
  loginUser,
  logoutUser,
}) {
  const [dataState, setDataState] = useState("not-set");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [error, setError] = useState("");
  const [prevPassword, setPrevPassword] = useState("");
  const [authenticateModel, setAuthenticateModel] = useState(null);
  const [authenticatePasswordType, setAuthenticatePasswordType] =
    useState("password");

  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setDataState("loading");

      const formData = new FormData();
      formData.append("userId", userId);
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("email", email);
      formData.append("prevEmail", userEmail);
      formData.append("file", profileImage);
      formData.append("password", password);
      formData.append("prevPassword", prevPassword);

      axios.defaults.withCredentials = true;
      const response = await axios.post(editProfileUrl, formData);

      if (response.data.ok) {
        loginUser(response.data.data);
        setDataState("success");
      } else {
        setDataState("error");
      }
    } catch (error) {
      setDataState("error");
    }
  };

  useEffect(() => {
    if (userFirstName) {
      setFirstName(userFirstName);
    }

    if (userLastName) {
      setLastName(userLastName);
    }

    if (userProfileImage) {
      setProfileImage(userProfileImage);
    }

    if (userEmail) {
      setEmail(userEmail);
    }

    if (!userId) {
      navigate("/contact");
    }
  }, [userId]);

  useEffect(() => {
    if (cPassword) {
      if (cPassword !== password) {
        setError("Password do not match.");
      } else {
        setError("");
      }
    }
  }, [cPassword]);

  return (
    <OuterContainer>
      <InnerContainer>
        <Header>
          <IoMdArrowRoundBack
            size={30}
            style={{
              color: "black",
              cursor: "pointer",
            }}
            onClick={() => {
              navigate("/home");
            }}
          />
          <TopHeading>Edit Profile</TopHeading>
        </Header>
        <CustomForm onSubmit={handleSubmit}>
          <EditProfileImage>
            {imagePreviewUrl || profileImage ? (
              <ImagePreview
                src={imagePreviewUrl || profileImage}
                alt="Image Preview"
              />
            ) : (
              <FaUserCircle
                size={200}
                style={{
                  padding: "4px",
                  color: "black",
                  background: "white",
                  borderRadius: "50%",
                }}
              />
            )}
            <ImageComponent
              type="file"
              accept={".jpg, .jpeg, .png, .gif"}
              onChange={(e) => {
                const file = e.target.files[0];
                setProfileImage(file);
                const reader = new FileReader();

                reader.onloadend = () => {
                  setImagePreviewUrl(reader.result);
                };

                if (file) {
                  reader.readAsDataURL(file);
                }
              }}
              ref={fileInputRef}
            />
            <EditIconContainer
              onClick={() => {
                fileInputRef.current.click();
              }}
            >
              <MdOutlineModeEditOutline size={35} style={{ color: "black" }} />
            </EditIconContainer>
          </EditProfileImage>

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

          <CustomInputContainer
            type="email"
            className="form-control"
            placeholder={"Email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <CustomInputContainer
            type="password"
            className="form-control"
            placeholder={"New Password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <CustomInputContainer
            type="password"
            className="form-control"
            placeholder={"Confirm Password"}
            value={cPassword}
            onChange={(e) => setCPassword(e.target.value)}
          />

          <Message>{error}</Message>
          <SubmitButton
            type="button"
            disabled={dataState === "loading"}
            onClick={() => {
              setAuthenticateModel({ type: "authenticate" });
            }}
          >
            Save changes
          </SubmitButton>
          {authenticateModel && authenticateModel.type === "authenticate" ? (
            <Modal
              isOpen={true}
              onClose={() => {
                setAuthenticateModel(null);
              }}
            >
              {dataState === "success" ? (
                <ConfirmationContent onClick={(e) => e.stopPropagation()}>
                  <TbCircleCheckFilled size={150} style={{ color: "green" }} />
                  <Title>Success</Title>
                  <ButtonContainer>
                    <Button
                      onClick={() => {
                        setAuthenticateModel(null);
                      }}
                    >
                      Close
                    </Button>
                  </ButtonContainer>
                </ConfirmationContent>
              ) : dataState === "error" ? (
                <ConfirmationContent onClick={(e) => e.stopPropagation()}>
                  <MdError size={150} style={{ color: "#cfb815" }} />
                  <Title>Error</Title>
                  <ButtonContainer>
                    <Button
                      onClick={() => {
                        setAuthenticateModel(null);
                      }}
                    >
                      Close
                    </Button>
                  </ButtonContainer>
                </ConfirmationContent>
              ) : (
                <>
                  <TopHeading>
                    <FaUserLock size={100} />
                  </TopHeading>
                  <Message style={{ color: "black" }}>
                    For your security, please confirm your current password to
                    continue.
                  </Message>
                  <PrevPasswordContainer>
                    <CustomInputContainer
                      type={authenticatePasswordType}
                      className="form-control"
                      placeholder={"Current Password"}
                      value={prevPassword}
                      style={{ color: "black", width: "90%" }}
                      onChange={(e) => setPrevPassword(e.target.value)}
                    />
                    {authenticatePasswordType === "password" ? (
                      <IoIosEyeOff
                        size={30}
                        onClick={() => setAuthenticatePasswordType("text")}
                      />
                    ) : (
                      <IoEyeSharp
                        size={28}
                        onClick={() => setAuthenticatePasswordType("password")}
                      />
                    )}
                  </PrevPasswordContainer>
                  <SubmitButtonContainer>
                    <ClearButton
                      onClick={() => {
                        setAuthenticateModel(null);
                      }}
                    >
                      Close
                    </ClearButton>
                    <SubmitButton
                      type="submit"
                      disabled={dataState === "loading"}
                      style={{ width: "30%" }}
                    >
                      {dataState === "loading" ? (
                        <Loader size={"5px"} color={"white"} />
                      ) : (
                        "Confirm"
                      )}
                    </SubmitButton>
                  </SubmitButtonContainer>
                </>
              )}
            </Modal>
          ) : (
            <></>
          )}
        </CustomForm>
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

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileScreen);
