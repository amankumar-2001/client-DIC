import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import ProfileDropDown from "./ProfileDropDown";
import cloudIcon from "./../logos/image.png";
import { FaUserCircle } from "react-icons/fa";
import { connect } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import { loginUser, logoutUser } from "../Store/Slices/userSlice";

const NavbarContainer = styled.nav`
  background-color: none;
`;

const ContainerFluid = styled.div`
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavbarBrand = styled(Link)`
  color: #fff;
  font-size: 1.5rem;
  text-decoration: none;
  &:hover {
    color: grey;
  }
`;

const NavbarNav = styled.div`
  list-style-type: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 300px;
  justify-content: space-evenly;
`;

const NavItem = styled.li`
  background-color: grey;
  opacity: ${({ active }) => (active ? "1" : "0.6")};
  min-width: 90px;
  min-height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  cursor: pointer;

  &:hover {
    opacity: 1;
  }
`;

const NavLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  font-weight: ${({ active }) => (active ? "bold" : "")};
  &:hover {
    color: white;
  }
`;

const DropdownButton = styled.button`
  padding-left: 1rem;
  padding-right: 1rem;
  background: none;
  border: none;
`;

const ImagePreview = styled.img`
  width: 46px;
  height: 46px;
  padding: 4px;
  border-radius: 50%;
  object-fit: cover;
`;

const MainIcon = styled.img`
  width: 63px;
`;

const Navbar = ({
  resetUser,
  setResetUser,
  userFirstName,
  userEmail,
  userId,
  userProfileImage,
  logoutUser,
  loginUser,
}) => {
  const navigate = useNavigate();
  const [dropDown, setDropDown] = useState(false);
  const location = useLocation();
  const { pathname } = location;

  function logOut() {
    logoutUser();
    navigate("/");
  }

  return (
    <NavbarContainer className="navbar navbar-expand-lg navbar-dark shadow-lg remain">
      <ContainerFluid className="container-fluid">
        <NavbarBrand to="/">
          <MainIcon src={cloudIcon} />
        </NavbarBrand>
        <NavbarNav>
          <NavItem
            active={pathname === "/about"}
            onClick={() => {
              navigate("/about");
            }}
          >
            <NavLink to="/about" active={pathname === "/about"}>
              About
            </NavLink>
          </NavItem>
          <NavItem
            active={pathname === "/contact"}
            onClick={() => {
              navigate("/contact");
            }}
          >
            <NavLink to="/contact" active={pathname === "/contact"}>
              Contact
            </NavLink>
          </NavItem>
        </NavbarNav>
        {userId && !["/"].includes(pathname) ? (
          <>
            <DropdownButton
              onClick={() => {
                setDropDown((prev) => !prev);
              }}
            >
              {userProfileImage ? (
                <ImagePreview src={userProfileImage} alt="Image Preview" />
              ) : (
                <FaUserCircle
                  size={45}
                  style={{ padding: "4px", color: "white" }}
                />
              )}
            </DropdownButton>
            {dropDown ? (
              <ProfileDropDown
                onClose={() => {
                  setDropDown(false);
                }}
                logOut={logOut}
                onClickEditProfile={() => {
                  navigate("/editProfile");
                }}
              />
            ) : null}
          </>
        ) : (
          <div></div>
        )}
      </ContainerFluid>
    </NavbarContainer>
  );
};

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

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
