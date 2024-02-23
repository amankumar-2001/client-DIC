import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import ErrorModal from "./ErrorModal";
import { styled } from "styled-components";
import { saveDataUrl } from "../apiDict";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";

const ImageComponent = styled.input`
  width: 100%;
  margin: 12px 0px 0px 0px;
`;

const SubmitButton = styled.button`
  display: inline-block;
  margin-top: 12px;
  padding: 7px 10px;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  border: none;
  color: white;
  border-radius: 7px;
  width: 100%;
  background-color: black;
  transition: background-color 0.3s, color 0.3s, border-color 0.3s;

  &:hover {
    background-color: grey;
    color: black;
  }
`;

function Add({ setShow, onClose }) {
  const [user] = useState(JSON.parse(localStorage.getItem("currentUser")));
  const [type, setType] = useState("Select the Create Type");
  const [data, setData] = useState("");
  const [error, setError] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("userId", user.userId);
    formData.append("typeOfData", type);
    formData.append("data", data);
    formData.append("file", file);

    try {
      setLoading(true);
      axios.defaults.withCredentials = true;
      const response = await axios.post(saveDataUrl, formData);

      if (!response?.ok && response?.tokenError) {
        navigate("/contact");
      }
      if (response.data && response.data.ok) {
        setShow("");
        const closeButton = document.querySelector(
          'button.btn-close[data-bs-dismiss="modal"][aria-label="Close"]'
        );
        if (closeButton) {
          closeButton.click();
          onClose();
        } else {
          console.error("Button not found");
        }
      } else {
        setError(response.data.message || "Please enter valid Data");
      }
      setLoading(false);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    if (error) {
      const intervalId = setInterval(() => {
        setError(false);
      }, 3000);

      return () => clearInterval(intervalId);
    }
  }, [error]);

  return (
    <div
      className="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="staticBackdropLabel">
              Create Data
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          {error && <ErrorModal errorMessage={error} />}
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>User</label>
                <input
                  type="email"
                  className="form-control"
                  id="emailInput"
                  placeholder={user.email}
                  disabled
                />
              </div>
              <div className="form-group">
                <label>Select Create Type</label>
                <select
                  className="form-control"
                  id="FormControlSelect1"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option>Select the Create Type</option>
                  <option>Blog</option>
                  <option>File</option>
                  <option>Note</option>
                  <option>Image</option>
                </select>
              </div>
              {type === "File" || type === "Image" || type === "Blog" ? (
                <ImageComponent
                  type="file"
                  className="form-control"
                  id="fileInput"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              ) : (
                <></>
              )}
              {type === "Note" || type === "Blog" ? (
                <div className="form-group">
                  <label htmlFor="FormControlTextarea1">
                    Additional Information
                  </label>
                  <textarea
                    className="form-control"
                    id="FormControlTextarea1"
                    rows="3"
                    value={data}
                    onChange={(e) => setData(e.target.value)}
                  ></textarea>
                </div>
              ) : (
                <></>
              )}
              <SubmitButton type="submit" disabled={loading}>
                {loading ? <Loader size={"5px"} color={"white"} /> : "Submit"}
              </SubmitButton>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Add;
