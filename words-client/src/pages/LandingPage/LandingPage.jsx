import React from "react";
import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css";
import Login from "../Login/Login";

const LandingPage = () => {
  return (
    <div className={styles.container}>
      <h1>Welcome to Memory words</h1>
      <Login />
    </div>
  );
};

export default LandingPage;
