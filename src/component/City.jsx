import { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import styles from "./City.module.css";
import BackButton from "./BackButton"
import { CitiesContext } from "./../context/CitiesContext";
// const formatDate = (date) =>
//   new Intl.DateTimeFormat("en", {
//     day: "numeric",
//     month: "long",
//     year: "numeric",
//     weekday: "long",
//   }).format(new Date(date));

function City() {
  const { id } = useParams();
  const { currentCity,fetchCitiesData } = useContext(CitiesContext);
  useEffect(
    function () {
      fetchCitiesData(id);
    },
    [id]
  );

  return (
    <>
      <div className={styles.cityDetails}>
        <div className={styles.headerSection}>
          <h6 className={styles.label}>City name</h6>
          <h3 className={styles.cityName}>{currentCity.cityName}</h3>
        </div>

        <div className={styles.visitSection}>
          <p className={styles.visitText}>
            You went to{" "}
            <span className={styles.cityNameInline}>
              {currentCity.cityName}
            </span>{" "}
            on
          </p>
          <h5 className={styles.visitDate}>{currentCity.date}</h5>
        </div>

        <div className={styles.notesSection}>
          <p className={styles.notesLabel}>Your notes</p>
          <h3 className={styles.notesText}>{currentCity.notes}</h3>
        </div>
      <BackButton>Back</BackButton>

      </div>
    </>
  );
}

export default City;
