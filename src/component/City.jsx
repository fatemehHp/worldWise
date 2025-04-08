// import { useParams } from "react-router-dom";
// import styles from "./City.module.css";
// import { createLogger } from "vite";

import { useParams } from "react-router-dom";

// const formatDate = (date) =>
//   new Intl.DateTimeFormat("en", {
//     day: "numeric",
//     month: "long",
//     year: "numeric",
//     weekday: "long",
//   }).format(new Date(date));

function City() {

  const {id}=useParams()
  console.log(id)



  return (
    <h1>{id}</h1>

  );
}

export default City;
