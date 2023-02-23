import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./elementModel.css";
import axios from "axios";
function ElementModel() {
  const dataId = useParams().dataId;
  const [result, setResult] = useState({});

  const getData = async () => {
    try { 
      // setloading(true);
      const getResult = await axios.post("http://localhost:5000/data/dataById",{dataId});
      setResult(getResult.data);
      console.log("this is result: ",getResult.data);
      // setloading(false);
    } catch (err) {
      console.log(err);
    }
  };
  
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
    {/* <div class="card" style="width: 18rem;">
  <img src="..." class="card-img-top" alt="..."/>
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div> */}
    <div className="container main">
      <div className="container profile-data">
        <p>{result.user}</p>
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
      <div>
        </div>
    </div>
    </>
  );
}

export default ElementModel;
