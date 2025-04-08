import React from "react";
import Sidebar from "./Sidebar";
import styles from './appLayout.module.css'
import Map from "./Map";
export default function AppLayout() {
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
    </div>
  );
}
