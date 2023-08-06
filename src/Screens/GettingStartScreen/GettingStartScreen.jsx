import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Element from "../../Components/Element";
import "./GettingStartscreen.css";
import Create from "../../Components/Create";
import axios from "axios";
import Loader from "../../Components/Loader";
import ErrorModal from "../../Components/ErrorModal";

function GettingStartScreen() {
  const navigate = useNavigate();
  const [render, setRender] = useState(true);
  const [createModal, setCreateModal] = useState("");
  const [info, setInfo] = useState();
  const [loading, setLoading] = useState([]);
  const [result, setResult] = useState([]);
  const [user] = useState(JSON.parse(localStorage.getItem("currentUser")));
  const allType = ["All", "Blog", "Images", "Form", "Notes"];

  const deleteById = (getId) => {
    const newResult = result.filter((value) => {
      return value._id !== getId;
    });

    setLoading(true);
    setResult(newResult);
    setInfo(newResult);
    setLoading(false);
  };

  function addData(newData) {
    const newResult = result;
    newResult.push(newData.data);

    render ? setRender(false) : setRender(true);
    setLoading(true);
    setResult(newResult);
    setInfo(newResult);
    setLoading(false);
  }

  const getData = async () => {
    try {
      setLoading(true);
      const data = await axios.get("https://deep-into-crud.vercel.app/data", {
        user: user.email,
      });

      setResult(data?.data);
      setInfo(data?.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  function filterByType(val) {
    allType.forEach((typeId) => {
      let path = document.getElementById(typeId);
      if (typeId === val) {
        path.style.background = "black";
        path.style.color = "white";
      } else {
        path.style.background = "none";
        path.style.color = "black";
      }
    });

    setInfo();
    if (val === "All") {
      setInfo(result);
    } else {
      const temp = result.filter((value) => {
        return value.typeOfData === val;
      });
      setInfo(temp);
    }
  }

  useEffect(() => {
    if (!result) navigate("/");
    getData();
  }, [render]);

  return (
    <div className="continer mt-4">
      <div className="container shadow-lg p-3 bg-white rounded">
        <h1 className="title">CRUD Dashboard</h1>

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
          <button
            className="px-4 py-1 btn2 element"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
            onClick={() => setCreateModal("show")}
          >
            Add
          </button>
        </div>
        <div className="outter mt-2">
          <div className="d-flex flex-wrap justify-content-start">
            {loading ? (
              <div className="container">
                <Loader size={20} />
              </div>
            ) : (
              info.map((value, i) => {
                return <Element item={value} key={i} deleteById={deleteById} />;
              })
            )}
          </div>
        </div>
      </div>
      {createModal && <Create addData={addData} />}
    </div>
  );
}

export default GettingStartScreen;
