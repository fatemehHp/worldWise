import React from "react";
import Sidebar from "./Sidebar";
import styles from './appLayout.module.css'
import Map from "./Map";
import User from "./User";
export default function AppLayout() {
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
      <User/>

    </div>
  );
}
