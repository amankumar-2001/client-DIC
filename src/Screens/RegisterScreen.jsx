import React, { useState } from "react";
import axios from "axios";

function Registerscreen() {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [cpassword, setcpassword] = useState("");

  async function check() {
    if (password === cpassword) {
      const newUser = { name, email, password, cpassword };
      try {
        const result = await axios.post("http://localhost:5000/users/register", newUser);
        if(result)
           window.location.href = "/users/login"; 
      } catch (err) {
        console.log(err);
      }
    } else alert("Password Not Matched...");
  }

  return (
    <div className="container mt-2">
      <div className="row justify-content-center p-3">
        <div className="col-md-5">
          <div className="bs padding">
            <h1>Register</h1>
            <input
              type="text"
              className="form-control mt-2"
              placeholder="name"
              value={name}
              onChange={(e) => setname(e.target.value)}
            />
            <input
              type="email"
              className="form-control mt-2"
              placeholder="email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
            <input
              type="password"
              className="form-control mt-2"
              placeholder="password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
            <input
              type="password"
              className="form-control mt-2"
              placeholder="confirm password"
              value={cpassword}
              onChange={(e) => setcpassword(e.target.value)}
            />

            <button className="btn-primary btn" onClick={check}>
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registerscreen;
