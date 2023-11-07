import styles from "./Register.module.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Register = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { value, name } = e.target;
    setUser((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user.email && user.password) {
      axios
        .post("/user", user)
        .then((response) => window.alert(response.data.message))
        .catch((response) => window.alert(response.data.message));
      // setUser({
      //   email: "",
      //   password: "",
      // });

      navigate("/login");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <h1>Register</h1>
      <TextField
        value={user.email}
        id="outlined-basic"
        label="Mail"
        variant="outlined"
        onChange={handleChange}
        name="email"
      />
      <TextField
        value={user.password}
        id="outlined-basic"
        type="password"
        label="Password"
        variant="outlined"
        onChange={handleChange}
        name="password"
      />
      <Button type="submit" variant="contained">
        Register
      </Button>
      <Link to={"/login"}>Login</Link>
    </form>
  );
};

export default Register;
