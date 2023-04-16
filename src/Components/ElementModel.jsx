import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./elementModel.css";
import axios from "axios";

function ElementModel() {
  const dataId = useParams().dataId;
  const [result, setResult] = useState({});
  const [createdDate,setCreatedDate]=useState("");
  const [updatedDate, setUpdatedDate] = useState("");


  const getData = async () => {
    try {
      let getResult = await axios.post("http://localhost:5000/data/dataById",{ dataId });
      let getDate = await function (getResult){
          setCreatedDate(new Date(getResult.data.createdAt));
      }
      
      setResult(getResult.data);
      console.log(createdDate) 
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="container main">
        <div className="container profile-data">
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
        <div className="middle-line"></div>
        <div className="container details">
          right Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
          rerum maxime asperiores nesciunt eum nemo quasi, id magni modi, natus
          perspiciatis et provident veritatis, iste placeat ipsa quaerat sequi
          cumque nam dolorem hic mollitia similique! Nulla eaque, quod quia
          praesentium cum eum nemo fugiat quidem rem, aspernatur odio ad autem.
          Distinctio amet blanditiis, porro dignissimos, repellat incidunt harum
          magnam cupiditate minus quibusdam rem officia odit sequi! Cupiditate,
          fugiat magnam. Et, quibusdam ut. Et adipisci quae, deleniti rerum
          asperiores voluptatum vel beatae, ratione facere praesentium sapiente
          deserunt. Reprehenderit, unde laboriosam. Voluptatem ad ex nobis quis
          velit doloribus doloremque odit minus voluptates!
        </div>
        <div></div>
      </div>
    </>
  );
}

export default ElementModel;
