import styles from "./CountryItem.module.css";

function CountryItem({ items }) {
  return (
    <li className={styles.countryItem}>
      <span>{items}</span>
    </li>
  );
}

export default CountryItem;
