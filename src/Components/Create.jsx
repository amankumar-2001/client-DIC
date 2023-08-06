import React from "react";
import { useState } from "react";
import axios from "axios";
import ErrorModal from "./ErrorModal";

function Add(props) {
  const [user] = useState(
    JSON.parse(localStorage.getItem("currentUser")).email
  );
  const [type, setType] = useState("Select the Create Type");
  const [data, setData] = useState("");
  const [error, setError] = useState("");

  const handleSubmitData = async () => {
    const newData = { user, type, data };
    try {
      const result = await axios.post(
        "https://deep-into-crud.vercel.app/data",
        newData
      );
      if (result) {
        props.addData(result);
        setType("");
        setData("");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
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
              <form>
                <div className="form-group">
                  <label for="exampleFormControlInput1">User</label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder={user}
                    disabled
                  />
                </div>
                <div className="form-group">
                  <label for="exampleFormControlSelect1">
                    Select Create Type
                  </label>
                  <select
                    className="form-control"
                    id="exampleFormControlSelect1"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  >
                    <option>Select the Create Type</option>
                    <option>Blog</option>
                    <option>Form</option>
                    <option>Notes</option>
                    <option>Images</option>
                  </select>
                </div>
                <div className="form-group">
                  <label for="exampleFormControlTextarea1">
                    Additional Information
                  </label>
                  <textarea
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    value={data}
                    onChange={(e) => setData(e.target.value)}
                  ></textarea>
                </div>
              </form>
            </div>
            <div
              className="modal-footer d-flex row align-self-center"
              style={{ width: "100%" }}
            >
              <button
                type="submit button"
                className="btn btn-primary"
                onClick={() => {
                  setData("");
                  setType("Select the Create Type");
                }}
                style={{ width: "20%" }}
              >
                Clear All
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => {
                  if (type !== "Select the Create Type") {
                    handleSubmitData();
                  } else {
                    setError("Please select the Create type");
                  }
                }}
                style={{ width: "20%" }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Add;
