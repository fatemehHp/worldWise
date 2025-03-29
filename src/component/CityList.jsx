import React, { useContext} from "react";
import styles from "./cityList.module.css";
import { DataContext } from "../App";
import CityItem from "./CityItem";
import Spinner from "./Spinner";
import Message from "./Message"

export default function CityList() {
  const { cities, isLoading,error } = useContext(DataContext);
  if (isLoading === true) {
    return <Spinner />;
  }
  if(!cities.length){
    return <Message error={error}/>
  }
  
  
  
  
  else {
    return (
      <ul className={styles.cityList}>
        {cities.map((item) => {
          return <CityItem item={item} key={item.id}/>
        })}
      </ul>
    );
  }
}
