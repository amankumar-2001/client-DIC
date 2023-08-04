import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./elementModel.css";
import Edit from "./Edit";

function ElementModel() {
  const dataId = useParams().dataId;
  const [result, setResult] = useState({});
  const [createdDate,setCreatedDate]=useState("");
  const [updatedDate,setUpdatedDate] = useState("");
  const [show, setShow]=useState(false);

  const getData = async () => {
    try {
      let getResult = await axios.post("https://deep-into-crud.vercel.app/data/dataById", {
        dataId,
      });

      setResult(getResult.data);
      
      setCreatedDate(getResult.data.createdAt.substring(0, 10));
      setUpdatedDate(getResult.data.updatedAt.substring(0, 10));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  },[]);

  return (
    <>
      <div className="container main">
        <div className="container profile-data">
          {show && <Edit data={result} />}
          <div className="d-flex flex-col">
            <div>
              <b>User: </b>
            </div>
            <div>{result.user}</div>
          </div>

          <div className="d-flex flex-col">
            <div>
              <b>Creation Date:</b>
            </div>
            <div>{createdDate}</div>
          </div>

          <div className="d-flex flex-col">
            <div>
              <b>Last Update:</b>
            </div>
            <div>{updatedDate}</div>
          </div>
        </div>
        <div className="middle-line m-3"></div>
        <div
          className="container details d-flex row justify-content-between px-5"
          style={{ height: "100%", width: "100%" }}
        >
          <div className="container" style={{ height: "85%" }}>
            {result.data}
          </div>
          <div
            className="container d-flex col-reverse justify-content-end"
            style={{ height: "10%" }}
          >
            <button
              className="btn text-white btn4"
              style={{ width: "10%" }}
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
              onClick={() => setShow(true)}
            >
              Edit
            </button>
            <button className="btn text-white btn4" style={{ width: "10%" }}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ElementModel;
