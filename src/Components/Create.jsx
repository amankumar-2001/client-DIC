import React from "react";
import { useState } from "react";
import axios from "axios";

function Add() {
  const [user,setUser]=useState("");
  const [type,setType]=useState('Blog');
  const [data,setData]=useState("");

  async function handleSubmitData(){
     const newData={user,type,data};
      try {
        const result = await axios.post("http://localhost:5000/data/createData", newData);
        if(result)
        {
            setUser("");
            setType("");
            setData("");
            window.location='/data';
        }
      } catch (err) {
        console.log(err);
      }
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
                    placeholder="name@example.com"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
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
            <div className="modal-footer">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={handleSubmitData}
              >
                Submit
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Add;
