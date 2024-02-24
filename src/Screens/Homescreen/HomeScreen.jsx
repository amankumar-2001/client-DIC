import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import LoginScreen from "../LoginScreen";
import Loader from "../../Components/Loader";
import RegisterScreen from "../RegisterScreen";
import "./Homescreen.css";

function HomeScreen({ resetUser, setResetUser }) {
  const [sign, setSign] = useState(1);
  const [loading, setLoading] = useState(false);

  const [user] = useState(JSON.parse(localStorage.getItem("currentUser")));

  function signIn() {
    setSign(1);
    let pathIn = document.getElementById("signIn");
    pathIn.style.background = "gray";
    let pathUp = document.getElementById("signUp");
    pathUp.style.background = "none";
  }

  function signUp() {
    setSign(0);
    let pathIn = document.getElementById("signIn");
    pathIn.style.background = "none";
    let pathUp = document.getElementById("signUp");
    pathUp.style.background = "gray";
  }

  return (
    <div className="container mt-5 minWidth">
      <div className="d-flex justify-content-between p-4 bg-black shadow-lg bar-wrap">
        <div className="container left border-end">
          <div className="operation">Create</div>
          <div className="operation">Read</div>
          <div className="operation">Update</div>
          <div className="operation">Delete</div>
        </div>
        <div className="container right">
          {user ? (
            <div className="container d-flex" style={{ height: "100%" }}>
              <div className="container text-white d-flex justify-content-center align-items-center">
                <Link to="/data" className="dashboard">
                  Go to Dashboard--&gt;
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div className="border-bottom login d-flex pt-3 justify-content-between">
                <div
                  id="signIn"
                  className="container sign border-end link"
                  onClick={signIn}
                >
                  <Link to="/users/login" className="link">
                    Login
                  </Link>
                </div>
                <div
                  id="signUp"
                  className="container sign link"
                  onClick={signUp}
                >
                  <Link to="/users/register" className="link">
                    SignUp
                  </Link>
                </div>
              </div>
              <div className="container bg-color">
                {sign ? (
                  <LoginScreen
                    setResetUser={setResetUser}
                  />
                ) : (
                  <RegisterScreen setLoading={setLoading} />
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;
