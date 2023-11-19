import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { sectionUpdate } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import styles from "./AddWord.module.css";
import toast from "react-hot-toast";

const AddWord = () => {
  const dispatch = useDispatch();
  const { box } = useParams();
  const [idUser, setIdUser] = useState("");

  const sections = useSelector((state) => state.sections);

  const selectSeccion = sections.find((sec) => sec.name === box);
  const { id } = selectSeccion;

  useEffect(() => {
    const id = JSON.parse(localStorage.getItem("idUser"));
    if (id) {
      setIdUser(id);
    }
  }, []);

  const [inputs, setInputs] = useState({
    englishWord: "",
    spanishWord: "",
    color: "",
    nameSeccion: box,
    idUser: idUser,
    idSeccion: id,
  });

  const handleChange = (e) => {
    const { value, name } = e.target;
    setInputs((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { englishWord, spanishWord, color, nameSeccion, idSeccion } = inputs;
    const info = {
      englishWord,
      spanishWord,
      color,
      nameSeccion,
      idUser,
      idSeccion,
    };
    if (info) {
      axios
        .post("words", info)
        .then(({ data }) => {
          if (data) {
            dispatch(sectionUpdate(data.data));
            toast.success(data.message);
          }
        })
        .catch(({ data }) => {
          console.log(data);
        });
      // }
      // setInputs({
      //   email: "",
      //   password: "",
      //   nameSeccion: "",
      // });
    }
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <TextField
        sx={{
          width: 500,
          maxWidth: "100%",
        }}
        fullWidth
        value={inputs.englishWord}
        id="fullWidth"
        variant="standard"
        label="English word"
        onChange={handleChange}
        name="englishWord"
      />
      <TextField
        sx={{
          width: 500,
          maxWidth: "100%",
        }}
        fullWidth
        value={inputs.spanishWord}
        id="fullWidth"
        variant="standard"
        type="text"
        label="Spanish word"
        onChange={handleChange}
        name="spanishWord"
      />{" "}
      <Select
        // labelId="demo-simple-select-filled-label"
        // id="demo-simple-select-filled"
        displayEmpty
        inputProps={{ "aria-label": "Without label" }}
        value={inputs.color}
        onChange={handleChange}
        label="Color"
        name="color"
        className={styles.select}
      >
        <MenuItem value="">
          <em>Color</em>
        </MenuItem>
        <MenuItem value={"gray"}>gray</MenuItem>
        <MenuItem value={"yellow"}>Yellow</MenuItem>
        <MenuItem value={"green"}>Green</MenuItem>
      </Select>
      <Button type="submit" variant="contained">
        Add word
      </Button>
    </form>
  );
};

export default AddWord;
