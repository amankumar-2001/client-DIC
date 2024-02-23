import "./App.css";
import Navbar from "./Components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./Components/Footer";
import AboutScreen from "./Screens/AboutScreen";
import HomeScreen from "./Screens/Homescreen/HomeScreen";
import GettingStartScreen from "./Screens/GettingStartScreen/GettingStartScreen";
import ContactScreen from "./Screens/ContactScreen";
import LandingScreen from "./Screens/LandingScreen";
import ProfilePage from "./Screens/ProfilePage";
import { useState } from "react";

function App() {
  const [resetUser, setResetUser] = useState(false);
  return (
    <div className="App">
      <Router>
        <Navbar resetUser={resetUser} setResetUser={setResetUser} />
        <Routes>
          <Route path="/" exact element={<LandingScreen />} />
          <Route path="/about" exact element={<AboutScreen />} />
          <Route path="/contact" exact element={<ContactScreen />} />
          <Route
            path="/users/login"
            exact
            element={
              <HomeScreen resetUser={resetUser} setResetUser={setResetUser} />
            }
          />
          <Route
            path="/users/register"
            exact
            element={
              <HomeScreen resetUser={resetUser} setResetUser={setResetUser} />
            }
          />
          <Route path="/data" exact element={<GettingStartScreen />} />
          <Route path="/profile" exact element={<ProfilePage />} />
          <Route path="/data/addData" exact element={<GettingStartScreen />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
