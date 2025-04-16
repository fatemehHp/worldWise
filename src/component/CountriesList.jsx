import React, { useContext } from "react";
import styles from "./CountryList.module.css";
import { CitiesContext } from "../context/CitiesContext";
import CountryItem from "./CountryItem";
import Spinner from "./Spinner";
import Message from "./Message";
export default function CountriesList() {
  const { cities, isLoading, error } = useContext(CitiesContext);
 const countries= cities.map((cities)=>cities.country)
 const uniqCountries=[...new Set(countries)]

  if (isLoading === true) {
    return <Spinner />;
  }
  if (!cities.length) {
    return <Message error={error} />;
  } else {
    return (
      <ul className={styles.countryList}>
        {uniqCountries.map((items) => {
          return <CountryItem items={items}/>;
        })}
      </ul>
    );
  }
}
