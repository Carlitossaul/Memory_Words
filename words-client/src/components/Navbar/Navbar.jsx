import * as React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import styles from "./Navbar.module.css";
// import Link from "@mui/material/Link";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOut } from "../../redux/actions";

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

export default function ActiveLastBreadcrumb() {
  const dispatch = useDispatch();

  const location = useLocation();
  return (
    location.pathname !== "/" && (
      <div
        className={styles.container}
        role="presentation"
        onClick={handleClick}
      >
        <Breadcrumbs aria-label="breadcrumb" className={styles.nav}>
          <Link underline="hover" color="inherit" to="/home">
            Home
          </Link>
          <Link underline="hover" color="inherit" to="/about">
            About
          </Link>
          <Link
            underline="hover"
            color="text.primary"
            aria-current="page"
            to="/"
            onClick={() => dispatch(logOut())}
          >
            Log out
          </Link>
        </Breadcrumbs>
      </div>
    )
  );
}
