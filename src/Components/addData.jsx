import React, { useEffect, useRef } from "react";
import { useState } from "react";
import axios from "axios";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack, IoMdImage } from "react-icons/io";
import { connect } from "react-redux";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { BLOGS, LOADING, NOTES } from "../Utils/constant";
import { saveDataUrl } from "../apiDict";
import Loader from "./Loader";

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const InnerContainer = styled.div`
  padding: 1rem;
  border-radius: 8px;
  min-width: 600px;
  min-height: 80%;
`;

const EditProfileImage = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-between;
  position: relative;
  align-items: center;
  background: grey;
  color: white;
  opacity: 0.8;
  border-radius: 8px;
  border: 1px solid white;
`;

const EditIconContainer = styled.div`
  display: flex;
  width: 40px;
  height: 40px;
  z-index: 12;
  justify-content: center;
  border-radius: 8px;
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
  border: 1px solid white;
  border-radius: 8px;
  height: 46px;
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

  &:disabled {
    background: grey;
    color: white;
    opacity: 0.6;
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
  justify-content: space-evenly;
  align-items: center;
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
  width: 100px;
  height: 100px;
  padding: 4px;
  border-radius: 8px;
  object-fit: cover;
`;

const FormGroup = styled.div`
  margin: 10px 0;
  width: 100%;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  font-size: 14px;
  resize: vertical;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background: none;
  border: 1px solid white;
  border-radius: 8px;
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

const Header = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 10fr 1fr;
`;

function AddData({
  userFirstName,
  userEmail,
  userId,
  userLastName,
  userProfileImage,
  selectedTab,
  setSelectedTab,
  setCurrentBlock,
  onSuccessfulAdd = () => {},
}) {
  const [data, setData] = useState("");
  const [displayMessage, setDisplayMessage] = useState({
    type: "",
    message: "",
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dataState, setDataState] = useState("not-set");
  const [profileImage, setProfileImage] = useState("");
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("userId", userId);
      formData.append("typeOfData", selectedTab.label.slice(0, -1));
      formData.append("data", data);
      formData.append("file", file);

      axios.defaults.withCredentials = true;
      const response = await axios.post(saveDataUrl, formData);

      if (!response?.ok && response?.data?.tokenError) {
        navigate("/contact");
      }
      if (response.data && response.data.ok) {
        setSelectedTab(null);
        setCurrentBlock("All");
        onSuccessfulAdd();
      } else {
        setDisplayMessage({
          type: "error",
          message: response.data.message,
        });
      }
      setLoading(false);
    } catch (error) {
      setDisplayMessage({
        type: "error",
        message: error.message,
      });
    }
  };

  useEffect(() => {
    if (displayMessage.type) {
      const intervalId = setInterval(() => {
        setDisplayMessage({
          type: "",
          message: "",
        });
      }, 3000);

      return () => clearInterval(intervalId);
    }
  }, [displayMessage]);

  useEffect(() => {
    setFile(null);
  }, [selectedTab]);

  return (
    <Container>
      <InnerContainer>
        <Header>
          <IoMdArrowRoundBack
            size={50}
            style={{
              marginLeft: "6px",
              padding: "4px",
              color: "black",
              cursor: "pointer",
            }}
            onClick={() => {
              setSelectedTab(null);
            }}
          />
          <TopHeading>Your new {selectedTab.label.slice(0, -1)}</TopHeading>
          <IoMdArrowRoundBack
            size={50}
            style={{
              marginLeft: "6px",
              padding: "4px",
              color: "black",
              cursor: "pointer",
              visibility: "hidden",
            }}
            onClick={() => {}}
          />
        </Header>

        <CustomForm onSubmit={handleSubmit}>
          <CustomInputContainer
            type="text"
            className="form-control"
            placeholder={"Email"}
            value={userFirstName + " " + userLastName}
            disabled={true}
          />
          {selectedTab.value === BLOGS ? (
            <FormGroup>
              <EditProfileImage>
                {imagePreviewUrl || profileImage ? (
                  <>
                    <ImagePreview
                      src={imagePreviewUrl || profileImage}
                      alt="Image Preview"
                    />
                    <TopHeading style={{ fontSize: "16px" }}>
                      {file?.name.length > 20
                        ? file?.name.substring(0, 20) + "..."
                        : file?.name}
                    </TopHeading>
                  </>
                ) : (
                  <>
                    <IoMdImage
                      size={100}
                      style={{
                        padding: "4px",
                        color: "black",
                        background: "white",
                        borderRadius: "8px",
                      }}
                    />
                    <TopHeading style={{ fontSize: "16px" }}>
                      No Image
                    </TopHeading>
                  </>
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
                      setFile(file);
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
                  <MdOutlineModeEditOutline
                    size={35}
                    style={{ color: "black" }}
                  />
                </EditIconContainer>
              </EditProfileImage>
              <TextArea
                id="FormControlTextarea1"
                rows="13"
                value={data}
                onChange={(e) => setData(e.target.value)}
                placeholder="Write your Blog"
              />
            </FormGroup>
          ) : (
            <></>
          )}
          {selectedTab.value === NOTES ? (
            <FormGroup>
              <TextArea
                id="FormControlTextarea1"
                rows="5"
                value={data}
                onChange={(e) => setData(e.target.value)}
                placeholder="Write a Note"
              />
            </FormGroup>
          ) : (
            <></>
          )}
          <Message>{displayMessage?.message}</Message>
          <SubmitButton
            type="button"
            disabled={dataState === LOADING}
            onClick={handleSubmit}
          >
            {loading ? (
              <Loader size={"5px"} color={"white"} />
            ) : selectedTab.value === BLOGS ? (
              "Post"
            ) : (
              "Save"
            )}
          </SubmitButton>
        </CustomForm>
      </InnerContainer>
    </Container>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {};
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

export default connect(mapStateToProps, mapDispatchToProps)(AddData);
