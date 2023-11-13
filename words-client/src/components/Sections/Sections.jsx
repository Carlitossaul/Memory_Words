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

  const handleDeleteSeccion = (id) => {
    dispatch(deleteSeccion(id));

    axios.delete(`/seccion/${id}`);
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
              <button
                className={styles.buttonDelete}
                onClick={() => handleDeleteSeccion(sec.id)}
              >
                <FaTrash />
              </button>
              <Link to={`/words/${sec.name}`}>{sec.name}</Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Sections;
