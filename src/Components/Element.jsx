import React from "react";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import "./element.css";

function Element({ deleteById, item }) {
  const handleDelete = async () => {
    confirmAlert({
      title: "Delete!!",
      message: "Are you sure, You want to delete this?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            try {
              await axios.delete(
                `https://deep-into-crud.vercel.app/data/delete/${item._id}`
              );
              deleteById(item._id);
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
  };

  return (
    <div className="card size">
      <div className="card-body">
        <h4 className="card-title d-flex justify-content-between align-items-center">
          {item.typeOfData}
          <button className="delete" onClick={handleDelete}>
            <MdDelete />
          </button>
        </h4>
        <p className="card-text text-start">
          <b>User:</b> {item.user}
        </p>
        <p className="card-text text-start">
          <b>Created At:</b> {item.createdAt.substring(0, 10)}
        </p>
      </div>
      <Link to={`../data/dataById/${item._id}`}>
        <button className="btn btn-primary btn3">Details</button>
      </Link>
    </div>
  );
}

export default Element;
