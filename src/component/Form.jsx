// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import BackButton from "./BackButton";
import styles from "./Form.module.css";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { useUrlPosition } from "../hooks/useUrlPosition";
const baseUrl = "https://api.bigdatacloud.net/data/reverse-geocode-client";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const[countryName,setCountryName]=useState()
  const [cityName, setCityName] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [mapLat, mapLng] = useUrlPosition();
  const [isFormDataLoading, setIsFormDataLoading] = useState(false);
  useEffect(
    function () {
      async function fetchDataForm() {
        try {
          setIsFormDataLoading(true);
          const response = await fetch(
            `${baseUrl}?latitude=${mapLat}&longitude=${mapLng}`
          );
          const data = await response.json()
          setCityName(data.city)
          setCountryName(data.countryName)
        } catch (error) {
          console.log(error);
        } finally {
          setIsFormDataLoading(false);
        }
      }
      fetchDataForm();
    },
    [mapLat, mapLng]
  );

  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="cityName">
          {
        cityName?cityName:""
          }
        </label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        {/* <span className={styles.flag}>{emoji}</span> */}
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton>&larr; Back</BackButton>
      </div>
    </form>
  );
}

export default Form;
