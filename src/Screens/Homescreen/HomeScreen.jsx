import React from "react";
import "./Homescreen.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import Loginscreen from "../LoginScreen";
import Registerscreen from "../RegisterScreen";

function HomeScreen() {
  const [sign, setSign] = useState(1);

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
    <div className="container mt-5">
      <div className="d-flex justify-content-between">
        <div className="container border-end left">
          <div className="operation">Create</div>
          <div className="operation">Read</div>
          <div className="operation">Update</div>
          <div className="operation">Delete</div>
        </div>
        <div className="container right mt-5">
          <div className="border-bottom login d-flex justify-content-between">
            <div
              id="signIn"
              className="container sign border-end"
              onClick={signIn}
            >
              <Link to="/users/login" className="link">
                LOGIN
              </Link>
            </div>
            <div id="signUp" className="container sign" onClick={signUp}>
              <Link to="/users/register" className="link">
                SIGN UP
              </Link>
            </div>
          </div>
          <div className="continer bg-color">
            {sign ? <Loginscreen /> : <Registerscreen />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;
