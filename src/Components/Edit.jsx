import React from "react";
import { useState } from "react";
import axios from "axios";

function Edit(params) {
  const [user] = useState(
    JSON.parse(localStorage.getItem("currentUser")).email
  );
  const [type, setType] = useState("Select the Create Type");
  const [data, setData] = useState("");

  async function handleSubmitData() {
    const newData = { user, type, data };
    // if (type !== "Select the Create Type") {
    //   try {
    //     const result = await axios.post("http://localhost:5000/data", newData);
    //     if (result) {
    //       setType("");
    //       setData("");
    //       const nextURL = "http://localhost:3000/data";
    //       window.location.assign(nextURL);
    //     }
    //   } catch (err) {
    //     console.log(err);
    //   }
    // } else {
    //   alert("Please select the Create type");
    // }
  }
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
                    disabled
                    onChange={(e) => setType(e.target.value)}
                  >
                    <option>{params.data.typeOfData}</option>
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
                    placeholder={params.data.data}
                  >
                    {params.data.data}
                  </textarea>
                </div>
              </form>
            </div>
            <div
              className="modal-footer d-flex row align-self-center"
              style={{ width: "100%" }}
            >
              <button
                type="submit"
                className="btn btn-primary"
                onClick={handleSubmitData}
                style={{ width: "20%" }}
              >
                Save
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                style={{ width: "20%" }}
              >
                Discard
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Edit;
