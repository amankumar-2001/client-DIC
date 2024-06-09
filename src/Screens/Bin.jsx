import { bindActionCreators } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { loginUser, logoutUser } from "../Store/Slices/userSlice";
import { binDataUrl } from "../apiDict";
import { useNavigate } from "react-router-dom";
import { DONE, LOADING } from "../Utils/constant";
import Loader from "../Components/Loader";
import emptyFileLogo from "../logos/empty.png";
import { styled } from "styled-components";
import axios from "axios";
import { connect } from "react-redux";
import {
  BlogCard,
  FileCard,
  ImageCard,
  NoteCard,
} from "../Components/Elements";

const Container = styled.div`
  height: 100%;
`;

const OuterContainer = styled.div`
  display: flex;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  padding: 1rem;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 0.25rem;
  height: 100%;
  gap: 12px;
`;

const InnerContainer = styled.div`
  padding-left: 12px;
  width: 100%;
`;

const BlockTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 8px;
  color: black;
  text-align: left;
`;

const EmptyDivContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const CustomTap = styled.button`
  border-radius: ${({ index }) =>
    index === 0 ? "12px 0px 0px 0px" : index === 4 ? "0px 12px 0px 0px" : ""};
  color: ${({ active }) => (active ? "white" : "black")};
  font-size: 1rem;
  cursor: pointer;
  background: none;
  border: none;
  font-weight: 600;
  text-decoration: none;
  padding: 6px 16px;

  &:hover {
    opacity: ${({ active }) => (active ? "1" : "0.5")};
  }
`;

const TabContainer = styled.div``;

const CreateNew = styled.div`
  border-radius: 12px;
  color: black;
  font-size: 1rem;
  cursor: pointer;
  background: none;
  border: none;
  font-weight: 600;
  text-decoration: none;
  padding: 6px 20px;
  border: 1px solid black;
  margin-bottom: 4px;
`;

const Header = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  position: sticky;
  top: 0px;
  z-index: 2;
  border-radius: 4px;
`;

const DataContainer = styled.div`
  display: block;
  height: 100vh;
  margin-top: 0.5rem;
  border-top: 1px solid black;
  border-left: 1px solid black;
  border-radius: 8px 0px 0px 0px;
`;

function Bin({ userId }) {
  const navigate = useNavigate();
  const [dataState, setDataState] = useState("not-set");
  const [result, setResult] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [displayMessage, setDisplayMessage] = useState({
    type: "",
    message: "",
  });

  const getData = async ({ typeOfData, userId }) => {
    try {
      setDataState("loading");
      axios.defaults.withCredentials = true;
      const response = await axios.get(
        binDataUrl({
          typeOfData,
          userId,
        })
      );

      if (!response?.data.ok && response?.data?.tokenError) {
        logoutUser();
        setDisplayMessage({
          type: "warning",
          message: "Your are logged out!!",
        });
        navigate("/contact");
      }

      if (response.data && response.data.ok) {
        setResult(response.data.data);
      } else {
        setDisplayMessage({ type: "error", message: response.data.message });
      }
      setDataState("done");
    } catch (err) {
      setDisplayMessage({ type: "error", message: err.message });
    }
  };

  useEffect(() => {
    if (userId) {
      getData({
        typeOfData: "",
        userId: userId,
      });
    } else {
      navigate("/contact");
    }
  }, [userId]);

  return (
    <Container>
      <Header>
        <h1 className="title">Bin</h1>
      </Header>
      <DataContainer
        style={{ height: "93%", overflow: "scroll", padding: "8px" }}
      >
        <div
          className="d-flex"
          style={{ flexDirection: "column", height: "100%" }}
        >
          {dataState === LOADING ? (
            <div className="container">
              <Loader size={20} />
            </div>
          ) : dataState === DONE && result.length > 0 ? (
            result.map(({ deletedDate, items }, index) => {
              return (
                <div key={index}>
                  <BlockTitle>{deletedDate}:</BlockTitle>
                  {items.map(({ data, metaData, typeOfData, contentId }, i) => {
                    return typeOfData === "Image" ? (
                      <ImageCard
                        key={i}
                        handleDelete={() => {}}
                        data={data}
                        metaData={metaData}
                        typeOfData={typeOfData}
                        contentId={contentId}
                        handleDownload={() => {}}
                        setShowConfirmationPopup={() => {}}
                        isDeletedView={true}
                      />
                    ) : typeOfData === "File" ? (
                      <FileCard
                        key={i}
                        handleDelete={() => {}}
                        data={data}
                        metaData={metaData}
                        typeOfData={typeOfData}
                        contentId={contentId}
                        handleDownload={() => {}}
                        setShowConfirmationPopup={() => {}}
                        isDeletedView={true}
                      />
                    ) : typeOfData === "Blog" ? (
                      <BlogCard
                        key={i}
                        handleDelete={() => {}}
                        data={data}
                        metaData={metaData}
                        typeOfData={typeOfData}
                        contentId={contentId}
                        setShowConfirmationPopup={() => {}}
                        isDeletedView={true}
                      />
                    ) : (
                      <NoteCard
                        key={i}
                        handleDelete={() => {}}
                        data={data}
                        metaData={metaData}
                        typeOfData={typeOfData}
                        contentId={contentId}
                        handleEdit={() => {}}
                        setShowConfirmationPopup={() => {}}
                        isDeletedView={true}
                      />
                    );
                  })}
                </div>
              );
            })
          ) : (
            <EmptyDivContainer>
              <img
                src={emptyFileLogo}
                style={{ width: "200px", height: "200px" }}
              />
            </EmptyDivContainer>
          )}
        </div>
      </DataContainer>
    </Container>
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

export default connect(mapStateToProps, mapDispatchToProps)(Bin);
