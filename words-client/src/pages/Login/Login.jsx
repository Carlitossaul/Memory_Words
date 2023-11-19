import styles from "./Login.module.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { getSections, login } from "../../redux/actions";

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";

const Login = () => {
  const dispatch = useDispatch();
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
        .post("/login", user)
        .then(({ data }) => {
          if (data) {
            const { access, id } = data;
            id && dispatch(getSections(id));
            access && dispatch(login(data));
            navigate("/home");
          }
        })
        .catch((error) => console.log(error));
      setUser({
        email: "",
        password: "",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <h1>Login</h1>
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
        Login
      </Button>
      <Link to={"/register"}>Register</Link>
    </form>
  );
};

export default Login;
