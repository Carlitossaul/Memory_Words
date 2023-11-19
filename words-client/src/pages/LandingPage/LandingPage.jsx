import React from "react";
import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css";
import Login from "../Login/Login";

const LandingPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.loginContainer}>
        <div>
          {" "}
          <h1>Welcome to Flash-Cards</h1>
        </div>
        <Login />
      </div>
    </div>
  );
};

export default LandingPage;
