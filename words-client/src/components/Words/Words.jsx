import axios from "axios";

//react
import { useState } from "react";
import { useParams } from "react-router-dom";

//components
import AddWord from "../AddWord/AddWord";

//redux
import { useSelector, useDispatch } from "react-redux";
import { deleteWordAction, sectionUpdate } from "../../redux/actions";

//icons and styles
import styles from "./Words.module.css";
import { FaTrash } from "react-icons/fa";
import { FaRegStarHalf } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { FaRegSave } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { Tooltip } from "react-tooltip";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";

const Words = () => {
  //current section
  const { box } = useParams();
  const sections = useSelector((state) => state.sections);
  const selectedSection = sections.find((sec) => sec.name === box);

  //redux
  const dispatch = useDispatch();

  //function for update color card
  const updateColor = async (key, color, idWord) => {
    if (selectedSection) {
      const { id, UserId } = selectedSection;

      const data = {
        englishWord: key,
        color,
        idSeccion: id,
        id: idWord,
        idUser: UserId,
      };

      try {
        const response = await axios.put("/words", data);
        if (response.data) {
          dispatch(sectionUpdate(response.data));
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const msg = new SpeechSynthesisUtterance();
  msg.lang = "en-US";

  const speechHandler = (msg, word) => {
    msg.text = word;
    window.speechSynthesis.speak(msg);
  };

  const handleDeleteWord = (wordId) => {
    axios
      .delete(`/words/${wordId}`)
      .then((response) => {
        if (response.status === 200) {
          dispatch(deleteWordAction(wordId));
          console.log("Palavra excluída com sucesso!");
        } else {
          console.error("Falha ao excluir a palavra.");
        }
      })
      .catch((error) => {
        console.error("Erro ao excluir a palavra:", error);
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.divTitle}>
        <h3>Words for {box}</h3>
        <AddWord />
      </div>
      <div className={styles.containerBox}>
        <ul>
          {selectedSection &&
            selectedSection.Words.map((word) => (
              <li
                key={word.id}
                className={` ${
                  (word.color === "green" && styles.greenBorder) ||
                  (word.color === "yellow" && styles.yellowBorder)
                } ${styles.li}`}
              >
                <div className={styles.divButtons}>
                  <button
                    className={styles.buttonDelete}
                    onClick={() => handleDeleteWord(word.id)}
                  >
                    <FaTrash />
                  </button>
                  <div className={styles.divButtonsColors}>
                    <button
                      onClick={() => updateColor(word.key, "gray", word.id)}
                      className={styles.buttonGray}
                    >
                      <FaRegStarHalf className={styles.iconGray} />
                    </button>
                    <button
                      onClick={() => updateColor(word.key, "yellow", word.id)}
                      className={styles.buttonYellow}
                    >
                      <FaRegStar className={styles.iconYellow} />
                    </button>
                    <button
                      onClick={() => updateColor(word.key, "green", word.id)}
                      className={styles.buttonGreen}
                    >
                      <FaRegSave className={styles.iconGreen} />
                    </button>
                  </div>
                </div>
                <h3>{word.key}</h3>
                <div className={styles.divButtons}>
                  <PlayCircleOutlineIcon
                    className={styles.icons}
                    onClick={() => speechHandler(msg, word.key)}
                  />
                  <FaEye
                    className={styles.icons}
                    id={`${word.id}`}
                    data-tooltip-content={`${word.value}`}
                  />
                  <Tooltip
                    style={{ backgroundColor: "#1976D2" }}
                    place="right"
                    anchorId={`${word.id}`}
                  />
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Words;
