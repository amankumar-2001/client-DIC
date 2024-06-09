import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ImageCard,
  FileCard,
  BlogCard,
  NoteCard,
} from "../Components/Elements";
import Create from "../Components/Create";
import axios from "axios";
import Loader from "../Components/Loader";
import MessageModel from "../Components/MessageModel";
import { editDataUrl, getDataUrl } from "../apiDict";
import { styled } from "styled-components";
import emptyFileLogo from "../logos/empty.png";
import ConfirmationPopup from "../Components/ConfirmationPopup";
import { connect } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import { loginUser, logoutUser } from "../Store/Slices/userSlice";
import AddData from "../Components/addData";
import CreateDropDown from "../Components/CreateDropDown";
import { BIN, DONE, HOME, LOADING } from "../Utils/constant";
import SideBar from "../Components/SideBar";
import Bin from "./Bin";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
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
  height: auto;
  margin-top: 0.5rem;
  border-top: 1px solid black;
  border-left: 1px solid black;
  border-radius: 8px 0px 0px 0px;
`;

function GettingStartScreen({
  userFirstName,
  userLastName,
  userEmail,
  userId,
  logoutUser,
  userProfileImage,
  loginUser,
}) {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState(null);
  const [selectedSideBarTab, setSelectedSideBarTab] = useState(HOME);
  const [dataState, setDataState] = useState("not-set");
  const [result, setResult] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [currentBlock, setCurrentBlock] = useState("All");
  const [showConfirmationPopup, setShowConfirmationPopup] = useState(null);
  const [displayMessage, setDisplayMessage] = useState({
    type: "",
    message: "",
  });

  const allType = ["All", "Blogs", "Images", "Files", "Notes"];

  const getData = async ({ typeOfData, userId }) => {
    try {
      setDataState("loading");
      axios.defaults.withCredentials = true;
      const response = await axios.get(
        getDataUrl({
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
        setResult(response.data.data.items);
        setTotalItems(response.data.data.totalLength);
      } else {
        setDisplayMessage({ type: "error", message: response.data.message });
      }
      setDataState("done");
    } catch (err) {
      setDisplayMessage({ type: "error", message: err.message });
    }
  };

  const handleDelete = async ({ contentId, typeOfData, data, toDelete }) => {
    try {
      setShowConfirmationPopup((prev) => {
        return { ...prev, state: "loading" };
      });
      axios.defaults.withCredentials = true;
      const response = await axios.post(editDataUrl, {
        userId: userId,
        contentId,
        typeOfData,
        data,
        toDelete,
      });
      if (!response?.data?.ok && response?.data?.tokenError) {
        logoutUser();
        navigate("/contact");
      }
      setShowConfirmationPopup((prev) => {
        return { ...prev, state: "success" };
      });
    } catch (error) {
      setShowConfirmationPopup((prev) => {
        return { ...prev, state: "error" };
      });
      setDisplayMessage({ type: "error", message: error.message });
    }
  };

  const handleEdit = async ({ contentId, typeOfData, data, toDelete }) => {
    try {
      setShowConfirmationPopup((prev) => {
        return { ...prev, state: "loading" };
      });
      axios.defaults.withCredentials = true;
      const response = await axios.post(editDataUrl, {
        userId: userId,
        contentId,
        typeOfData,
        data,
        toDelete,
      });
      if (!response.data.ok && response?.data?.tokenError) {
        logoutUser();
        navigate("/contact");
      }
      setShowConfirmationPopup((prev) => {
        return { ...prev, state: "success" };
      });
    } catch (error) {
      setShowConfirmationPopup((prev) => {
        return { ...prev, state: "error" };
      });
      setDisplayMessage({ type: "error", message: error.message });
    }
  };

  const handleDownload = async ({ publicUrl, fileName }) => {
    try {
      const response = await axios({
        url: publicUrl,
        method: "GET",
        responseType: "blob",
      });

      const urlObject = window.URL || window.webkitURL;
      const blob = new Blob([response.data]);
      const downloadUrl = urlObject.createObjectURL(blob);

      const downloadEvent = document.createElement("a");
      downloadEvent.href = downloadUrl;
      downloadEvent.download = fileName;

      document.body.appendChild(downloadEvent);
      downloadEvent.click();
      document.body.removeChild(downloadEvent);
    } catch (error) {
      setDisplayMessage({
        type: "error",
        message: `Error downloading file:${error.message}`,
      });
    }
  };

  useEffect(() => {
    if (userId && currentBlock) {
      getData({
        typeOfData: currentBlock.endsWith("s") ? currentBlock.slice(0, -1) : "",
        userId: userId,
      });
    } else {
      navigate("/contact");
    }
  }, [userId, currentBlock]);

  return (
    <>
      {displayMessage.type && (
        <MessageModel
          message={displayMessage.message}
          messageType={displayMessage.type}
          onClose={() => {
            setDisplayMessage({ type: "", message: "" });
          }}
        />
      )}
      <div className="p-4" style={{ height: "86%", minWidth: "650px" }}>
        <OuterContainer>
          <SideBar
            selectedTabForNew={selectedTab}
            setSelectedTabForNew={setSelectedTab}
            setCurrentBlock={setCurrentBlock}
            selectedSideBarTab={selectedSideBarTab}
            setSelectedSideBarTab={setSelectedSideBarTab}
            onSuccessfulAdd={() => {
              getData({
                typeOfData: "",
                userId: userId,
              });
            }}
          />
          <InnerContainer style={{ height: "100%" }}>
            {selectedSideBarTab === HOME ? (
              <>
                <Header>
                  <h1 className="title">My Drive Dashboard</h1>
                  <TabContainer>
                    {allType.map((block, i) => {
                      return (
                        <CustomTap
                          key={i}
                          index={i}
                          id={block}
                          active={block === currentBlock}
                          onClick={() => {
                            setCurrentBlock(block);
                            setSelectedTab(null);
                          }}
                        >
                          {block}
                        </CustomTap>
                      );
                    })}
                  </TabContainer>
                </Header>
                <DataContainer
                  style={{ height: "93%", overflow: "scroll", padding: "8px" }}
                >
                  <div
                    className="d-flex"
                    style={{ flexDirection: "column", height: "100%" }}
                  >
                    {selectedTab ? (
                      <AddData
                        selectedTab={selectedTab}
                        setSelectedTab={setSelectedTab}
                        setCurrentBlock={setCurrentBlock}
                        onSuccessfulAdd={() => {
                          getData({
                            typeOfData: "",
                            userId: userId,
                          });
                        }}
                      />
                    ) : dataState === LOADING ? (
                      <div className="container">
                        <Loader size={20} />
                      </div>
                    ) : dataState === DONE && totalItems != 0 ? (
                      ["Note", "File", "Image", "Blog"].map((block, i) => {
                        return (
                          <div key={i}>
                            {result[block].length > 0 && (
                              <BlockTitle>{block}s:</BlockTitle>
                            )}
                            <Container>
                              {result[block].map(
                                (
                                  { data, metaData, typeOfData, contentId },
                                  i
                                ) => {
                                  return block === "Image" ? (
                                    <ImageCard
                                      key={i}
                                      handleDelete={handleDelete}
                                      data={data}
                                      metaData={metaData}
                                      typeOfData={typeOfData}
                                      contentId={contentId}
                                      handleDownload={handleDownload}
                                      setShowConfirmationPopup={
                                        setShowConfirmationPopup
                                      }
                                    />
                                  ) : block === "File" ? (
                                    <FileCard
                                      key={i}
                                      handleDelete={handleDelete}
                                      data={data}
                                      metaData={metaData}
                                      typeOfData={typeOfData}
                                      contentId={contentId}
                                      handleDownload={handleDownload}
                                      setShowConfirmationPopup={
                                        setShowConfirmationPopup
                                      }
                                    />
                                  ) : block === "Blog" ? (
                                    <BlogCard
                                      key={i}
                                      handleDelete={handleDelete}
                                      data={data}
                                      metaData={metaData}
                                      typeOfData={typeOfData}
                                      contentId={contentId}
                                      setShowConfirmationPopup={
                                        setShowConfirmationPopup
                                      }
                                    />
                                  ) : (
                                    <NoteCard
                                      key={i}
                                      handleDelete={handleDelete}
                                      data={data}
                                      metaData={metaData}
                                      typeOfData={typeOfData}
                                      contentId={contentId}
                                      handleEdit={handleEdit}
                                      setShowConfirmationPopup={
                                        setShowConfirmationPopup
                                      }
                                    />
                                  );
                                }
                              )}
                            </Container>
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
              </>
            ) : selectedSideBarTab === BIN ? (
              <Bin />
            ) : (
              <></>
            )}
          </InnerContainer>
        </OuterContainer>
        {showConfirmationPopup ? (
          <ConfirmationPopup
            title={showConfirmationPopup.title}
            message={showConfirmationPopup.message}
            closeBtnText={showConfirmationPopup.closeBtnText}
            closeBtnFunction={showConfirmationPopup.closeBtnFunction}
            confirmBtnText={showConfirmationPopup.confirmBtnText}
            successPopupText={showConfirmationPopup.successPopupText}
            confirmBtnFunction={showConfirmationPopup.confirmBtnFunction}
            successPopupBtnText={showConfirmationPopup.successPopupBtnText}
            successPopupBtnFunction={() => {
              showConfirmationPopup.successPopupBtnFunction();
              getData({ typeOfData: "", userId: userId });
            }}
            errorPopupBtnText={showConfirmationPopup.errorPopupBtnText}
            errorPopupBtnFunction={showConfirmationPopup.errorPopupBtnFunction}
            state={showConfirmationPopup.state}
          />
        ) : (
          <></>
        )}
      </div>
    </>
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

export default connect(mapStateToProps, mapDispatchToProps)(GettingStartScreen);
