import React from "react";
import styles from "./cityItem.module.css";
import { Link } from "react-router-dom";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
export default function CityItem({ item }) {
  return (
    <li>
      <Link to={`${item.id}?lat=${item.position.lat}&lng=${item.position.lng}`} className={styles.cityItem}>
        <span className={styles.emoji}></span>
        <h3 className={styles.name}>{item.cityName}</h3>
        <time className={styles.time}>{formatDate(item.date)}</time>
        <button className={styles.deleteBtn}>x</button>
      </Link>
    </li>
  );
}
