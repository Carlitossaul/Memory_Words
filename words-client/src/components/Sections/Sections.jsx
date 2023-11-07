import { Link } from "react-router-dom";
import styles from "./Sections.module.css";
import { useDispatch, useSelector } from "react-redux";
import AddSection from "../AddSection/AddSection";
import { useEffect, useState } from "react";
import { getSections } from "../../redux/actions";

const Sections = () => {
  const dispatch = useDispatch();

  const section = useSelector((state) => state.sections);

  useEffect(() => {
    const id = JSON.parse(localStorage.getItem("idUser"));
    if (id) {
      dispatch(getSections(id));
    }
  }, []);

  // <Link to={`/user/${id}/section/${sec._id}`}>{sec.name}</Link>
  return (
    <div className={styles.container}>
      <h2>Boxs</h2>
      {section &&
        section.map((sec) => (
          <div className={styles.boxs} key={sec.id}>
            <Link to={`/words/${sec.name}`} className={styles.box}>
              {sec.name}
            </Link>
          </div>
        ))}
      <AddSection />
    </div>
  );
};

export default Sections;
