import React from "react";
import styles from "./sidebar.module.css";
import Logo from "./Logo";
import AppNav from "./AppNav";
import { Outlet } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav/>
      <Outlet/>
      <footer className={styles.footer}>
        <p className={styles.copyright}>Lorem ipsum dolor sit amet.</p></footer>
    </div>
  );
}
