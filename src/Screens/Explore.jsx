import { bindActionCreators } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { loginUser, logoutUser } from "../Store/Slices/userSlice";
import { getExploreUrl, getLandingExploreUrl } from "../apiDict";
import { json, useNavigate } from "react-router-dom";
import { DONE, LOADING } from "../Utils/constant";
import Loader from "../Components/Loader";
import emptyFileLogo from "../logos/empty.png";
import { styled } from "styled-components";
import axios from "axios";
import { connect } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import { DateTime } from "luxon";
import { FaSearch } from "react-icons/fa";

const Container = styled.div`
  height: 100%;
`;

const BlockTitle = styled.p`
  font-size: 18px;
  margin-bottom: 8px;
  color: white;
  text-align: left;
`;

const EmptyDivContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Header = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  position: ${({ landingPage }) => (landingPage ? "" : "sticky")};
  top: 0px;
  z-index: 2;
  border-radius: 4px;
  height: 7%;
  color: ${({ landingPage }) => (landingPage ? "white" : "")};
  align-items: center;
  flex-direction: ${({ landingPage }) => (landingPage ? "column" : "row")};
`;

const DataContainer = styled.div`
  display: flex;
  overflow: ${({ landingPage }) => (landingPage ? "" : "scroll")};
  justify-content: center;
  flex-wrap: wrap;
  height: 100%;
  margin-top: 0.5rem;
  border-top: 1px solid black;
  border-left: 1px solid black;
  border-radius: 8px 0px 0px 0px;
  height: 93%;
  gap: 12px;
`;

const BlogContainer = styled.div`
  display: flex;
  padding: 24px;
  background: black;
  flex-direction: column;
  align-items: center;
  border-radius: 8px;
  width: 50%;
  min-width: 500px;
  margin: 12px;
  border: 1px solid ${({ landingPage }) => (landingPage ? "white" : "black")};
`;

const ReadMoreDiv = styled.p`
  color: #0d6efd;
  cursor: pointer;
`;

const UserInfoDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  align-items: center;
  gap: 12px;
  margin-bottom: 14px;
`;

const UserDisplayProfile = styled.img`
  width: 46px;
  height: 46px;
  padding: 4px;
  border-radius: 50%;
  object-fit: cover;
`;
const UserInfo = styled.div`
  color: white;
  font-size: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const SearchDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  width: 400px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px 15px;
  border: 2px solid #ccc;
  border-radius: 50px;
  font-size: 16px;
  outline: none;
  background: none;
  transition: border-color 0.3s;

  &:focus {
    border-color: black;
  }

  &::placeholder {
    color: white;
  }
`;

const SearchIcon = styled(FaSearch)`
  position: absolute;
  transform: translateX(170px);
  color: white;
`;

const BlogImage = styled.img`
  max-width: 498px;
`;

function Explore({ userId, screen = "home" }) {
  const navigate = useNavigate();
  const [dataState, setDataState] = useState("not-set");
  const [result, setResult] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [displayMessage, setDisplayMessage] = useState({
    type: "",
    message: "",
  });

  const getData = async () => {
    try {
      setDataState("loading");
      axios.defaults.withCredentials = true;
      const response = await axios.get(
        getExploreUrl({
          limit: 5,
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
        setResult(
          response.data.data
            .filter((blog) => {
              return (
                blog.userInfo.firstName
                  .toLowerCase()
                  .includes(searchText.toLowerCase()) ||
                blog.userInfo?.lastName
                  .toLowerCase()
                  .includes(searchText.toLowerCase())
              );
            })
            .map((blog) => {
              const givenDate = DateTime.fromISO(blog.updatedAt, {
                zone: "utc",
              });
              const currentDate = DateTime.now().setZone("utc");

              const differenceInDays = currentDate.diff(givenDate, "days").days;
              const differenceInHours = currentDate.diff(
                givenDate,
                "hours"
              ).hours;
              const differenceInMinutes = currentDate.diff(
                givenDate,
                "minutes"
              ).minutes;
              const differenceInSeconds = currentDate.diff(
                givenDate,
                "seconds"
              ).seconds;

              let postedAt = 0;

              if (Math.round(differenceInDays) !== 0) {
                postedAt = `${Math.round(differenceInDays)} days`;
              } else if (Math.round(differenceInHours) !== 0) {
                postedAt = `${Math.round(differenceInHours)} hours`;
              } else if (Math.round(differenceInMinutes) !== 0) {
                postedAt = `${Math.round(differenceInMinutes)} minutes`;
              } else {
                postedAt = `${Math.round(differenceInSeconds)} seconds`;
              }

              return {
                ...blog,
                expand: false,
                postedAt,
              };
            })
        );
      } else {
        setDisplayMessage({ type: "error", message: response.data.message });
      }
      setDataState("done");
    } catch (err) {
      setDisplayMessage({ type: "error", message: err.message });
    }
  };

  const getExplore = async () => {
    try {
      setDataState("loading");
      axios.defaults.withCredentials = true;
      const response = await axios.get(
        getLandingExploreUrl({
          limit: 5,
        })
      );

      if (response.data && response.data.ok) {
        setResult(
          response.data.data.map((blog) => {
            const givenDate = DateTime.fromISO(blog.updatedAt, { zone: "utc" });
            const currentDate = DateTime.now().setZone("utc");

            const differenceInDays = currentDate.diff(givenDate, "days").days;
            const differenceInHours = currentDate.diff(
              givenDate,
              "hours"
            ).hours;
            const differenceInMinutes = currentDate.diff(
              givenDate,
              "minutes"
            ).minutes;
            const differenceInSeconds = currentDate.diff(
              givenDate,
              "seconds"
            ).seconds;

            let postedAt = 0;

            if (Math.round(differenceInDays) !== 0) {
              postedAt = `${Math.round(differenceInDays)} days`;
            } else if (Math.round(differenceInHours) !== 0) {
              postedAt = `${Math.round(differenceInHours)} hours`;
            } else if (Math.round(differenceInMinutes) !== 0) {
              postedAt = `${Math.round(differenceInMinutes)} minutes`;
            } else {
              postedAt = `${Math.round(differenceInSeconds)} seconds`;
            }

            return {
              ...blog,
              expand: false,
              postedAt,
            };
          })
        );
      } else {
        setDisplayMessage({ type: "error", message: response.data.message });
      }
      setDataState("done");
    } catch (err) {
      setDisplayMessage({ type: "error", message: err.message });
    }
  };

  useEffect(() => {
    if (screen === "landing") {
      getExplore();
    } else if (userId) {
      getData();
    } else {
      navigate("/contact");
    }
  }, [userId]);

  return (
    <Container>
      <Header landingPage={screen === "landing"}>
        <h1 className="title">
          {screen === "landing" ? "Latest Blog" : "Explore"}
        </h1>
        {screen !== "landing" && (
          <SearchDiv>
            <SearchInput
              type="text"
              placeholder="Search by name..."
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
            />
            <SearchIcon
              size={25}
              onClick={() => {
                getData();
              }}
            />
          </SearchDiv>
        )}
      </Header>
      <DataContainer landingPage={screen === "landing"}>
        {dataState === LOADING ? (
          <Loader size={20} />
        ) : dataState === DONE && result.length > 0 ? (
          result.map((blog, index) => {
            return (
              <BlogContainer key={index} landingPage={screen === "landing"}>
                <UserInfoDiv>
                  {blog.userInfo?.profileImage ? (
                    <UserDisplayProfile src={blog.userInfo?.profileImage} />
                  ) : (
                    <FaUserCircle
                      size={45}
                      style={{ padding: "4px", color: "white" }}
                    />
                  )}

                  <UserInfo>
                    {`${blog.userInfo.firstName} ${
                      blog.userInfo.lastName ? blog.userInfo.lastName : ""
                    }`}

                    <UserInfo style={{ fontSize: "15px" }}>
                      {blog.postedAt} ago
                    </UserInfo>
                  </UserInfo>
                </UserInfoDiv>
                <BlogImage
                  src={blog.metaData.publicURL}
                  landingPage={screen === "landing"}
                />
                <BlockTitle>
                  {blog.data.length > 400 && blog.expand === false
                    ? blog.data.substring(0, 400) + "..."
                    : blog.data}
                  {blog.data.length > 400 ? (
                    <ReadMoreDiv
                      onClick={() => {
                        const resultCopy = JSON.parse(JSON.stringify(result));
                        resultCopy[index].expand = result[index].expand
                          ? false
                          : true;

                        setResult(resultCopy);
                      }}
                    >
                      {blog.expand ? "Read Less" : "Read More"}
                    </ReadMoreDiv>
                  ) : (
                    ""
                  )}
                </BlockTitle>
              </BlogContainer>
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

export default connect(mapStateToProps, mapDispatchToProps)(Explore);
