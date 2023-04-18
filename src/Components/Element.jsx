import React from "react";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import "./element.css";

function Element(params) {
  async function handleDelete() {
    confirmAlert({
      title: "Delete!!",
      message: "Are you sure, You want to delete this?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            try {
              await axios.delete(
                `http://localhost:5000/data/delete/${params.item._id}`
              );
              params.deleteId(params.item._id);
            } catch (error) {
              console.log(error);
            }
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  }
  return (
    <div className="card size">
      <div className="card-body">
        <h4 className="card-title d-flex justify-content-between align-items-center">
          {params.item.typeOfData}
          <button className="delete" onClick={handleDelete}>
            <MdDelete />
          </button>
        </h4>
        <p className="card-text text-start">
          <b>User:</b> {params.item.user}
        </p>
        <p className="card-text text-start">
          <b>Created At:</b> {params.item.createdAt.substring(0, 10)}
        </p>
      </div>
      <Link to={`../data/dataById/${params.item._id}`}>
        <button className="btn btn-primary btn3">Details</button>
      </Link>
    </div>
  );
}

export default Element;
