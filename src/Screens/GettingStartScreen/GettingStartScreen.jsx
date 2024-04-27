import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ImageCard,
  FileCard,
  BlogCard,
  NoteCard,
} from "../../Components/Elements";
import "./GettingStartscreen.css";
import Create from "../../Components/Create";
import axios from "axios";
import Loader from "../../Components/Loader";
import MessageModel from "../../Components/MessageModel";
import { editDataUrl, getDataUrl } from "../../apiDict";
import { styled } from "styled-components";
import emptyFileLogo from ".././../logos/empty.png";
import ConfirmationPopup from "../../Components/ConfirmationPopup";
import { connect } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import { loginUser, logoutUser } from "../../Store/Slices/userSlice";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
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
    index === 0 ? "12px 0px 0px 0px" : index === 5 ? "0px 12px 0px 0px" : ""};
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
  const [createModal, setCreateModal] = useState("");
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

  const filterByType = (val) => {
    allType.forEach((typeId) => {
      let path = document.getElementById(typeId);
      if (typeId === val) {
        path.style.background = "black";
        path.style.color = "white";
      } else {
        path.style.background = "none";
        path.style.color = "black";
      }
    });

    getData({
      typeOfData: val.endsWith("s") ? val.slice(0, -1) : "",
      userId: userId,
    });
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
    if (userId) {
      getData({ typeOfData: "", userId: userId });
    } else {
      navigate("/contact");
    }
  }, [userId]);

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
        <div
          className="shadow-lg p-3 bg-white rounded"
          style={{ height: "100%", overflow: "scroll" }}
        >
          <h1 className="title">My Drive Dashboard</h1>
          <div className="border-bottom border-dark d-flex justify-content-start">
            {allType.map((block, i) => {
              return (
                <CustomTap
                  key={i}
                  index={i}
                  id={block}
                  className="px-4 py-1 btn2 element border-end border-dark"
                  onClick={() => {
                    setCurrentBlock(block);
                    filterByType(block);
                  }}
                >
                  {block}
                </CustomTap>
              );
            })}
            <CustomTap
              index={5}
              className="px-4 py-1 btn2 element"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
              onClick={() => setCreateModal("show")}
            >
              Add
            </CustomTap>
          </div>
          <div className="outer mt-2">
            <div
              className="d-flex"
              style={{ flexDirection: "column", height: "100%" }}
            >
              {dataState === "loading" ? (
                <div className="container">
                  <Loader size={20} />
                </div>
              ) : dataState === "done" && totalItems != 0 ? (
                ["Note", "File", "Image", "Blog"].map((block, i) => {
                  return (
                    <div key={i}>
                      {result[block].length > 0 && (
                        <BlockTitle>{block}s:</BlockTitle>
                      )}
                      <Container>
                        {result[block].map(
                          ({ data, metaData, typeOfData, contentId }, i) => {
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
          </div>
        </div>
        {createModal && (
          <Create
            setShow={setCreateModal}
            onClose={() => {
              filterByType(currentBlock);
            }}
          />
        )}
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
