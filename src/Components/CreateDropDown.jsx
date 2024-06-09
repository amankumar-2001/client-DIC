import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { GiStabbedNote } from "react-icons/gi";
import { CgNotes } from "react-icons/cg";
import { IoImageSharp } from "react-icons/io5";
import { connect } from "react-redux";
import { BLOGS, NOTES, IMAGES, Types_OPTIONS, FILES } from "../Utils/constant";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { saveDataUrl } from "../apiDict";
import { AiFillFileText } from "react-icons/ai";

const ProfileWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ProfileDivContainer = styled.div`
  display: flex;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  align-items: center;
  width: 150px;
  position: absolute;
  top: 180px;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const CustomTab = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const HoverTab = styled.div`
  display: flex;
  align-items: center;
  width: 95%;
  height: 38px;
  margin: 4px;
  justify-content: flex-start;
  gap: 16px;
  padding-left: 15px;
  font-weight: 800;
  cursor: pointer;
  color: black;
  &:hover {
    background: #ced4da;
    border-radius: 4px;
  }
`;

const HoverInputTab = styled.input`
  width: 100%;
  margin: 12px 0px 0px 0px;
  display: none;
`;

const CustomForm = styled.form``;

function CreateDropDown({
  onClose,
  setSelectedTab,
  selectedTab,
  userFirstName,
  userLastName,
  userEmail,
  userId,
  userProfileImage,
  setCurrentBlock,
}) {
  const [data, setData] = useState("");
  const [file, setFile] = useState(null);
  const [fileType, setFileType] = useState("");
  const [displayMessage, setDisplayMessage] = useState({
    type: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("userId", userId);
      formData.append("typeOfData", fileType);
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
        onClose();
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
    if (file) {
      handleSubmit();
    }
  }, [file]);

  useEffect(() => {
    console.log({ selectedTab });
  }, [selectedTab]);

  return (
    <ProfileDivContainer>
      <CustomTab
        onClick={() => {
          setSelectedTab(Types_OPTIONS[0]);
        }}
      >
        <HoverTab>
          <GiStabbedNote size={30} />
          {BLOGS}
        </HoverTab>
      </CustomTab>

      <CustomTab
        onClick={() => {
          setSelectedTab(Types_OPTIONS[1]);
        }}
      >
        <HoverTab>
          <CgNotes size={30} />
          {NOTES}
        </HoverTab>
      </CustomTab>

      <CustomTab>
        <CustomForm>
          <HoverInputTab
            type="file"
            accept=".jpg, .jpeg, .png, .gif"
            onChange={(e) => {
              setFileType("Image");
              setFile(e.target.files[0]);
            }}
            ref={imageInputRef}
          />
        </CustomForm>
        <HoverTab
          onClick={() => {
            if (imageInputRef.current) {
              imageInputRef.current.click();
            }
          }}
        >
          <IoImageSharp size={30} />
          {IMAGES}
        </HoverTab>
      </CustomTab>

      <CustomTab>
        <CustomForm>
          <HoverInputTab
            type="file"
            accept=".pdf, .xlsx, .xls, .ppt, .pptx"
            onChange={(e) => {
              setFileType("File");
              setFile(e.target.files[0]);
            }}
            ref={fileInputRef}
          />
        </CustomForm>
        <HoverTab
          onClick={() => {
            if (fileInputRef.current) {
              fileInputRef.current.click();
            }
          }}
        >
          <AiFillFileText size={30} />
          {FILES}
        </HoverTab>
      </CustomTab>
    </ProfileDivContainer>
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateDropDown);
