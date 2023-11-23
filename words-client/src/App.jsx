//styles
import styles from "./App.module.css";

//dependencies
// axios.defaults.baseURL = "https://words-api-dev-btjj.2.ie-1.fl0.io/";
axios.defaults.baseURL = "http://localhost:3001/";
import { Routes, Route } from "react-router-dom";
import axios from "axios";

// components
import ActiveLastBreadcrumb from "./components/Navbar/Navbar";
import Login from "./pages/Login/Login";
import LandingPage from "./pages/LandingPage/LandingPage";
import Register from "./pages/Register/Register";
import Words from "./components/Words/Words";
import Sections from "./components/Sections/Sections";

function App() {
  return (
    <div className={styles.container}>
      <ActiveLastBreadcrumb />
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/words/:box" element={<Words />} />
        <Route exact path="/home" element={<Sections />} />
      </Routes>
    </div>
  );
}

export default App;
