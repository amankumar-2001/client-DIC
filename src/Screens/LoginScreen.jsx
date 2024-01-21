import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ErrorModal from "../Components/ErrorModal";
import "./pos.css";
import { getUserUrl } from "../apiDict";

function LoginScreen({ setLoading }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const checkUser = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        getUserUrl({
          email,
          password,
        })
      );
      if (response.data.ok && response.data.res.ok) {
        window.localStorage.setItem(
          "currentUser",
          JSON.stringify(response.data.res.data)
        );
        navigate("/data");
      }
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
