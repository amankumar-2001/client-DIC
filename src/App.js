import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import AboutScreen from "./Screens/AboutScreen";
import HomeScreen from "./Screens/HomeScreen";
import GettingStartScreen from "./Screens/GettingStartScreen/GettingStartScreen";
import ContactScreen from "./Screens/ContactScreen";
import EditProfileScreen from "./Screens/EditProfileScreen";
import RecycleBinScreen from "./Screens/RecycleBinScreen";

function App() {
  const [resetUser, setResetUser] = useState(false);
  return (
    <div className="App">
      <Router>
        <Navbar resetUser={resetUser} setResetUser={setResetUser} />
        <Routes>
          <Route path="/" exact element={<HomeScreen />} />
          <Route path="/about" exact element={<AboutScreen />} />
          <Route path="/contact" exact element={<ContactScreen />} />
          <Route path="/home" exact element={<GettingStartScreen />} />
          <Route path="/editProfile" exact element={<EditProfileScreen />} />
          <Route path="/recycleBin" exact element={<RecycleBinScreen />} />
          <Route path="/home/addData" exact element={<GettingStartScreen />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
