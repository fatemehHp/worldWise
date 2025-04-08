import React from "react";
import styles from "./map.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function Map() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  function goToForm() {
    navigate("form");
  }
  return (
    <div className={styles.mapContainer} onClick={goToForm}>
      <h1>
        position :{lat}//// {lng}
      </h1>
      <button onClick={() => setSearchParams({ lat: "4223", lng: "3207" })}>
        change searchparams
      </button>
    </div>
  );
}
