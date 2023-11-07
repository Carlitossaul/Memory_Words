import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./AddSection.module.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { sectionUpdate } from "../../redux/actions";

const AddSection = () => {
  const [idUser, setIdUser] = useState("");
  const dispatch = useDispatch();

  // const idUser = useSelector((state) => state.idUser);
  useEffect(() => {
    const id = JSON.parse(localStorage.getItem("idUser"));
    if (id) {
      setIdUser(id);
    }
  }, []);

  const [inputs, setInputs] = useState({
    name: "",
    idUser: idUser,
  });

  const handleChange = (e) => {
    const { value, name } = e.target;
    setInputs((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('clic submit')

    const { name } = inputs;

    const info = { name, idUser };

    if (info) {
      axios
        .post("seccion", info)
        .then(({ data }) => {
          if (data) {
            dispatch(sectionUpdate(data));
          }
        })
        .catch(({ data }) => {
          console.log(data);
        });
    }
    // setInputs({
    //   email: "",
    //   password: "",
    //   nameSeccion: "",
    // });
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <h4>Add new box</h4>
      <TextField
        value={inputs.name}
        id="filled-basic"
        label="box name"
        variant="filled"
        onChange={handleChange}
        name="name"
      /> 

      <Button type="submit" variant="contained">
        Add box
      </Button>
    </form>
  );
};

export default AddSection;
