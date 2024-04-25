import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import ProfileDropDown from "./ProfileDropDown";
import { FaUserCircle } from "react-icons/fa";

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

const NavbarTogglerIcon = styled.span`
  color: #fff;
`;

const NavbarCollapse = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
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

const Navbar = ({ resetUser, setResetUser }) => {
  const navigate = useNavigate();
  const [dropDown, setDropDown] = useState(false);
  const location = useLocation();
  const { pathname } = location;

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("currentUser"))
  );

  function logOut() {
    localStorage.removeItem("currentUser");
    navigate("/");
  }

  useEffect(() => {
    if (resetUser) {
      setUser(JSON.parse(localStorage.getItem("currentUser")));
      setResetUser(false);
    }
  }, [resetUser]);

  return (
    <NavbarContainer className="navbar navbar-expand-lg navbar-dark shadow-lg remain">
      <ContainerFluid className="container-fluid">
        <NavbarBrand to="/">CRUD Drive</NavbarBrand>
        <NavbarNav>
          {user ? (
            <NavItem
              active={pathname === "/home"}
              onClick={() => {
                navigate("/home");
              }}
            >
              <NavLink to="/home" active={pathname === "/home"}>
                Home
              </NavLink>
            </NavItem>
          ) : null}
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
        {user ? (
          <>
            <DropdownButton
              onClick={() => {
                setDropDown((prev) => !prev);
              }}
            >
              {user?.profileImage ? (
                <ImagePreview src={user?.profileImage} alt="Image Preview" />
              ) : (
                <FaUserCircle
                  size={45}
                  style={{ padding: "4px", color: "white" }}
                />
              )}
            </DropdownButton>
            {dropDown ? (
              <ProfileDropDown
                user={user}
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

export default Navbar;
