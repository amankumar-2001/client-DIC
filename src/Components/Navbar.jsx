import React, { useState } from "react";
import "./nav.css";
import { Link } from "react-router-dom";

function Navbar() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("currentUser"))
  );
  
  function logOut(){
    localStorage.removeItem("currentUser");
    window.location.href = "/";
  }

  return (
    <nav class="navbar navbar-expand-lg navbar-dark p-md-3 shadow-lg p-3 remain">
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
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li>
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
                <button
                  type="button"
                  className="btn btn-secondary dropdown-toggle no-back drpdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {user.name}
                </button>
                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-dark">
                  <li>
                    <button className="dropdown-item" type="button">
                      Action
                    </button>
                  </li>
                  <li>
                    <button className="dropdown-item" type="button">
                      Another action
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
