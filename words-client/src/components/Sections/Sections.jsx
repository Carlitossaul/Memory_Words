import { Link } from "react-router-dom";
import styles from "./Sections.module.css";
import { FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import AddSection from "../AddSection/AddSection";
import { useEffect } from "react";
import { deleteSeccion, getSections } from "../../redux/actions";
import axios from "axios";

const Sections = () => {
  const dispatch = useDispatch();

  const section = useSelector((state) => state.sections);

  useEffect(() => {
    const id = JSON.parse(localStorage.getItem("idUser"));
    if (id) {
      dispatch(getSections(id));
    }
  }, []);

  // function deleted
  // const handleDeleteSeccion = (id) => {
  //   dispatch(deleteSeccion(id));

  //   axios.delete(`/seccion/${id}`);
  // };

  const getColorsCount = (sec) => {
    const colorsCount = sec.Words.reduce((acc, word) => {
      const color = word.color || "gray"; // Si el color es null o undefined, se considera "gray"
      acc[color] = (acc[color] || 0) + 1;
      return acc;
    }, {});

    return colorsCount;
  };

  console.log(section);

  return (
    <div className={styles.container}>
      <div className={styles.containerTitle}>
        <h2>Boxs</h2>
        <AddSection />
      </div>
      <div className={styles.boxs}>
        {section &&
          section.map((sec) => (
            <div className={styles.box} key={sec.id}>
              <ul className={styles.count}>
                <span>Total: {sec.Words.length}</span>
                <li>Green: {getColorsCount(sec).green || 0}</li>
                <li>Yellow: {getColorsCount(sec).yellow || 0}</li>
                <li>Gray: {getColorsCount(sec).gray || 0}</li>
              </ul>
              {/* <button
                className={styles.buttonDelete}
                onClick={() => handleDeleteSeccion(sec.id)}
              >
                <FaTrash />
              </button> */}
              <Link to={`/words/${sec.name}`}>{sec.name}</Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Sections;
