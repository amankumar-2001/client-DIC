import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ErrorModal from "../Components/ErrorModal";
import SuccessModal from "../Components/SuccessModal";
import { registerUserUrl } from "../apiDict";

function RegisterScreen({ setLoading }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const registerUser = async () => {
    try {
      const response = await axios.post(registerUserUrl, {
        name,
        email,
        password,
      });
      if (response.data.ok) {
        if (response.data.res.ok) {
          setSuccess(true);
        } else {
          setError(response.data.res.err);
        }
      } else {
        setError(response.data.message);
      }
      setLoading(false);
    } catch (err) {
      setError(err?.response?.data?.message);
    }
  };

  useEffect(() => {
    if (success || error) {
      const intervalId = setInterval(() => {
        setSuccess(false);
        setError(false);
      }, 3000);

      return () => clearInterval(intervalId);
    }
  }, [success, error]);

  return (
    <div className="container mt-2">
      <div className="row justify-content-center p-3">
        <div className="col-md-5 width">
          <div className="bs padding">
            <h1>Register</h1>
            {error ? (
              <ErrorModal errorMessage={error} />
            ) : success ? (
              <SuccessModal successMessage={"Successfully Registered"} />
            ) : (
              <></>
            )}
            <input
              type="text"
              className="form-control mt-2"
              placeholder="name"
              value={name}
              onChange={(e) => {
                setError(false);
                setName(e.target.value);
              }}
            />
            <input
              type="email"
              className="form-control mt-2"
              placeholder="email"
              value={email}
              onChange={(e) => {
                setError(false);
                setEmail(e.target.value);
              }}
            />
            <input
              type="password"
              className="form-control mt-2"
              placeholder="password"
              value={password}
              onChange={(e) => {
                setError(false);
                setPassword(e.target.value);
              }}
            />
            <input
              type="password"
              className="form-control mt-2"
              placeholder="confirm password"
              value={cPassword}
              onChange={(e) => {
                setError(false);
                setCPassword(e.target.value);
              }}
            />

            <button
              className="btn-primary btn"
              onClick={() => {
                password === cPassword
                  ? registerUser()
                  : setError("Password Not Matched...");
              }}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterScreen;
