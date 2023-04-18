import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginUser } from "../Store/Slices/userSlice";
import './pos.css';

function Loginscreen() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  
  const dispatch= useDispatch();

  async function check() {
      const findUser = {email, password};
      try {
        console.log(findUser);
        const result = await axios.post("http://localhost:5000/users/login",findUser);
      
        dispatch(loginUser(result.data));
        window.localStorage.setItem("currentUser", JSON.stringify(result.data));
        window.location.href = "/data";    
      } catch (err) {
        console.log(err);
      }
  }

  return (
    <div className="container mt-2">
      <div className="row justify-content-center p-3">
        <div className="col-md-5 width">
            <h1>Login</h1>
            <input
              type="email"
              className="form-control mt-2"
              placeholder="email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            /> 
            <input
              type="password"
              className="form-control mt-2"
              placeholder="password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />

            <button className="btn-primary btn" onClick={()=>check()}>Login</button>
        </div>
      </div>
    </div>
  );
}

export default Loginscreen;
