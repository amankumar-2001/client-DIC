import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { styled } from "styled-components";
import { saveDataUrl } from "../apiDict";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";
import { RiArrowDropDownLine } from "react-icons/ri";
import { connect } from "react-redux";

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

const DropdownButton = styled.button`
  padding-left: 1rem;
  padding-right: 1rem;
  border: 1px solid #ced4da;
  margin: 12px 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ErrorComponent = styled.div`
  width: 100%;
  margin: 12px 0px 0px 0px;
  color: ${({ messageType }) =>
    messageType === "error"
      ? "red"
      : messageType === "warning"
      ? "yellow"
      : messageType === "success"
      ? "green"
      : ""};
`;

function Add({
  setShow,
  onClose,
  userFirstName,
  userEmail,
  userId,
  userProfileImage,
}) {
  const [type, setType] = useState("Select the Create Type");
  const [data, setData] = useState("");
  const [displayMessage, setDisplayMessage] = useState({
    type: "",
    message: "",
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (type === "Select the Create Type") {
      setDisplayMessage({
        type: "error",
        message: "Please enter valid Data",
      });
      setLoading(false);
      return;
    }
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("userId", userId);
      formData.append("typeOfData", type);
      formData.append("data", data);
      formData.append("file", file);

      axios.defaults.withCredentials = true;
      const response = await axios.post(saveDataUrl, formData);

      if (!response?.ok && response?.data?.tokenError) {
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
        setDisplayMessage({
          type: "error",
          message: response.data.message,
        });
      }
      setLoading(false);
    } catch (error) {
      setDisplayMessage({
        type: "error",
        message: error.message,
      });
    }
  };

  useEffect(() => {
    if (displayMessage.type) {
      const intervalId = setInterval(() => {
        setDisplayMessage({
          type: "",
          message: "",
        });
      }, 3000);

      return () => clearInterval(intervalId);
    }
  }, [displayMessage]);

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
          {displayMessage.type && (
            <ErrorComponent
              messageType={displayMessage.type}
              onClick={() => {
                setDisplayMessage({ type: "", message: "" });
              }}
            >
              {displayMessage.message}
            </ErrorComponent>
          )}
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>User</label>
                <input
                  type="email"
                  className="form-control"
                  id="emailInput"
                  placeholder={userEmail}
                  disabled
                />
              </div>
              <div className="form-group">
                <DropdownButton
                  type="button"
                  className="form-control"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {type}
                  <RiArrowDropDownLine />
                </DropdownButton>
                <ul
                  className="dropdown-menu dropdown-menu-end dropdown-menu-dark"
                  style={{ width: "94%" }}
                >
                  {["Blog", "File", "Note", "Image"].map((options, i) => {
                    return (
                      <div key={i}>
                        <li>
                          <button
                            className="dropdown-item"
                            type="button"
                            onClick={() => {
                              setType(options);
                            }}
                          >
                            {options}
                          </button>
                        </li>
                        {i !== 3 ? (
                          <li>
                            <hr className="dropdown-divider" />
                          </li>
                        ) : (
                          ""
                        )}
                      </div>
                    );
                  })}
                </ul>
              </div>
              {type === "File" || type === "Image" || type === "Blog" ? (
                <ImageComponent
                  type="file"
                  className="form-control"
                  id="fileInput"
                  accept={
                    type === "File"
                      ? ".pdf, .xlsx, .xls, .ppt, .pptx"
                      : ".jpg, .jpeg, .png, .gif"
                  }
                  onChange={(e) => setFile(e.target.files[0])}
                />
              ) : (
                <></>
              )}
              {type === "Note" || type === "Blog" ? (
                <div className="form-group">
                  <label
                    htmlFor="FormControlTextarea1"
                    style={{ margin: "4px 0px" }}
                  >
                    {type === "Blog" ? "Write your Blog" : "New Note"}
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

const mapDispatchToProps = (dispatch) => {
  return {};
};

const mapStateToProps = (state) => {
  return {
    userFirstName: state.user.firstName,
    userLastName: state.user.lastName,
    userEmail: state.user.email,
    userId: state.user.userId,
    userProfileImage: state.user.profileImage,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Add);
