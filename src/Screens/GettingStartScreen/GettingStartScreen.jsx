import React, { useEffect } from "react";
import { useState } from "react";
import Element from "../../Components/Element";
import "./GettingStartscreen.css";
import Create from "../../Components/Create";
import { Link } from "react-router-dom";
import axios from "axios";
import Loader from "../../Components/Loader";

function GettingStartScreen() {
  const [show, setShow] = useState(false);
  const [info, setInfo] = useState();
  const [loading, setloading] = useState([]);
  const [result, setResult] = useState([]);
  const [allType, setAllType] = useState([
    "All",
    "Blog",
    "Images",
    "Form",
    "Notes",
  ]);
  const getData = async () => {
    try {
      setloading(true);
      const getResult = await axios.get("http://localhost:5000/data");
      setResult(getResult.data);
      setInfo(getResult.data);
      setloading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  function filterByType(val) {
    allType.forEach((typeId) => {
      let path = document.getElementById(typeId);
      if (typeId == val) {
        path.style.background = "black";
        path.style.color = "white";
      } else {
        path.style.background = "none";
        path.style.color = "black";
      }
    });

    setInfo();
    if (val == "All") {
      setInfo(result);
    } else {
      const temp = result.filter((value) => {
        return value.typeOfData === val;
      });
      setInfo(temp);
    }
  }

  function handleAdd() {
    setShow(true);
  }
  return (
    <div className="continer mt-4">
      <div className="container shadow-lg p-3 bg-white rounded">
        <h1 className="title">CRUD Operation</h1>
        {show && <Create />}
        
        <div className="border-bottom border-dark d-flex justify-content-start">
          <button
            id="All"
            className="px-4 py-1 btn2 element border-end border-dark"
            onClick={() => {
              filterByType("All");
            }}
          >
            All
          </button>
          <button
            id="Blog"
            className="px-4 py-1 btn2 element border-end border-dark"
            onClick={() => {
              filterByType("Blog");
            }}
          >
            Blog
          </button>
          <button
            id="Images"
            className="px-4 py-1 btn2 element border-end border-dark"
            onClick={() => {
              filterByType("Images");
            }}
          >
            Image
          </button>
          <button
            id="Form"
            className="px-4 py-1 btn2 element border-end border-dark"
            onClick={() => {
              filterByType("Form");
            }}
          >
            Form
          </button>
          <button
            id="Notes"
            className="px-4 py-1 btn2 element border-end border-dark"
            onClick={() => {
              filterByType("Notes");
            }}
          >
            Notes
          </button>
          <Link to="/data/addData" className="btn2">
            <button
              className="px-4 py-1 btn2 element"
              onClick={handleAdd}
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
            >
              Add
            </button>
          </Link>
        </div>
        <div className="outter mt-2">
          <div className="d-flex flex-wrap justify-content-start">
            {loading ? (
              <div className="container">
                <Loader />
              </div>
            ) : (
              info.map((value, i) => {
                return <Element item={value} key={i} />;
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GettingStartScreen;
