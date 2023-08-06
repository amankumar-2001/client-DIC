import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ErrorModal from "../Components/ErrorModal";
import SuccessModal from "../Components/SuccessModal";

function RegisterScreen({ setLoading }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const registerUser = async (newUser) => {
    try {
      const result = await axios.post(
        "https://deep-into-crud.vercel.app/users/register",
        newUser
      );
      setLoading(false);
      result && setSuccess(true);
    } catch (err) {
      setError(err?.response?.data?.message);
    }
  };

  const checkUserAlreadyExist = async () => {
    const newUser = { name, email, password, cPassword };
    try {
      setLoading(true);
      const findUser = await axios.get(
        "https://deep-into-crud.vercel.app/users/find",
        newUser
      );
  
      if (findUser?.data?.email) {
        setLoading(false);
        setError("User Already exist!! Use another Email");
      } else {
        registerUser(newUser);
      }
    } catch (err) {
      setError(err?.response?.data?.message);
    }
  };

  return (
    <div className="container mt-2">
      <div className="row justify-content-center p-3">
        <div className="col-md-5 width">
          <div className="bs padding">
            <h1>Register</h1>
            {error && <ErrorModal errorMessage={error} />}
            {success && <SuccessModal successMessage={"Successfully Registered"}/>}
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
                  ? checkUserAlreadyExist()
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
