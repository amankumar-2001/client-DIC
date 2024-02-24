import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const DropdownButton = styled.button`
  padding-left: 1rem;
  padding-right: 1rem;
  background: none;
  border: none;
`;

function Navbar({ resetUser, setResetUser }) {
  const navigate = useNavigate();
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
    <nav className="navbar navbar-expand-lg navbar-dark shadow-lg remain">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Deep-Into-CRUD
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {user ? (
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/data"
                >
                  Home
                </Link>
              </li>
            ) : (
              <></>
            )}
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                Contact
              </Link>
            </li>
          </ul>
          {user && (
            <>
              <div className="btn-group">
                <DropdownButton
                  type="button"
                  className="btn btn-secondary dropdown-toggle no-back"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {user.name}
                </DropdownButton>
                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-dark">
                  <li>
                    <button
                      className="dropdown-item"
                      type="button"
                      onClick={() => {
                        navigate("/profile");
                      }}
                    >
                      Profile
                    </button>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      type="button"
                      onClick={() => logOut()}
                    >
                      Log out
                    </button>
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
