import React, { useEffect, useState } from "react";
import "./element.css";
import { Link } from "react-router-dom";
import ElementModel from "./ElementModel";

function Element(params) { 
  const [itemData,setItemData]=useState(params.item);
  
  return (
      <div className="card size">
        <div className="card-body">
          <h4 className="card-title">{params.item.typeOfData}</h4>
          <p className="card-text">{params.item.user}</p>
          <p className="card-text">{params.item.createdAt}</p>
          <p className="card-text">{params.item.data}</p>
        </div>
        <Link to={`../data/dataById/${params.item._id}`}>
        <button className="btn btn-primary btn3">Details</button>
        </Link>
      </div>
  );
}

export default Element;
