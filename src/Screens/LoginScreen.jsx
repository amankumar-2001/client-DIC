import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../Store/Slices/userSlice";
import ErrorModal from "../Components/ErrorModal";
import "./pos.css";

function LoginScreen({ setLoading }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const checkUser = async () => {
    const userToFind = { email, password };
    try {
      setLoading(true);
      const result = await axios.post(
        "https://deep-into-crud.vercel.app/users/login",
        userToFind
      );

      // dispatch(loginUser(result.data));
      window.localStorage.setItem("currentUser", JSON.stringify(result.data));
      navigate("/data");
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err?.response?.data?.message);
    }
  };

  return (
    <div className="container mt-2">
      <div className="row justify-content-center p-3">
        <div className="col-md-5 width">
          <h1>Login</h1>
          {error && <ErrorModal errorMessage={error} />}
          <input
            type="email"
            className="form-control mt-2"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="form-control mt-2"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="btn-primary btn" onClick={() => checkUser()}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
