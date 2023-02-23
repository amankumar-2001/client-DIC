import './App.css';
import Navbar from './Components/Navbar';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Footer from './Components/Footer';
import AboutScreen from './Screens/AboutScreen';
import HomeScreen from './Screens/Homescreen/HomeScreen';
import GettingStartScreen from './Screens/GettingStartScreen/GettingStartScreen';
import ContactScreen from './Screens/ContactScreen';
import LandingScreen from './Screens/LandingScreen';
import ElementModel from './Components/ElementModel';


function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" exact element={<LandingScreen/>} />
          <Route path="/users/login" exact element={<HomeScreen />} />
          <Route path="/users/register" exact element={<HomeScreen />} />
          <Route path="/data/addData" exact element={<GettingStartScreen />} />
          <Route path="/data/dataById/:dataId" exact element={<ElementModel/>} />
          <Route path="/about" exact element={<AboutScreen />} />
          <Route path="/contact" exact element={<ContactScreen/>} />
          <Route path="/data" exact element={<GettingStartScreen/>} />
        </Routes>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
