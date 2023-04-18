import React from "react";
import "./pos.css";
function LandingScreen() {
  setTimeout(() => {
    window.location.href = "/users/login";
  }, 1000);

  return (
    <div>
      <div className="container welcome">Welcome!</div>
    </div>
  );
}

export default LandingScreen;
