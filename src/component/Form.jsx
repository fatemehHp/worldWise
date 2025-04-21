import "react-datepicker/dist/react-datepicker.css";
import { useContext, useEffect, useState } from "react";
import BackButton from "./BackButton";
import styles from "./Form.module.css";
import Button from "./Button";
import Message from "./Message";
import { useUrlPosition } from "../hooks/useUrlPosition";
import DatePicker from "react-datepicker";
import { CitiesContext } from "../context/CitiesContext";
const baseUrl = "https://api.bigdatacloud.net/data/reverse-geocode-client";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [countryName, setCountryName] = useState();
  const [cityName, setCityName] = useState("");
  const [date, setDate] = useState();
  const [notes, setNotes] = useState("");
  const [mapLat, mapLng] = useUrlPosition();
  const{sendCity}=useContext(CitiesContext)
  const [isFormDataLoading, setIsFormDataLoading] = useState(false);
  useEffect(
    function () {
      async function fetchDataForm() {
        try {
          setIsFormDataLoading(true);
          if (mapLat && mapLng) {
            setDate();
            const response = await fetch(
              `${baseUrl}?latitude=${mapLat}&longitude=${mapLng}`
            );
            const data = await response.json();
            setCityName(data.city);
            setCountryName(data.countryName);
          }
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

  if (!mapLat && !mapLng) {
    return <Message error="click on map" />;
  }
  // submot form function
  function handleSubmit(e) {
    e.preventDefault();
    if (!cityName || !date) {
      return;
    }
    const newCity = {
      cityName,
      countryName,
      date,
      notes,
      position:{lat:mapLat,lng:mapLng}
  
    };
    sendCity(newCity)
    
  }
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">city name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName ? cityName : ""}
        />
        {/* <span className={styles.flag}>{emoji}</span> */}
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>

        <DatePicker
          id="date"
          onChange={(date) => setDate(date)}
          selected={date}
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
