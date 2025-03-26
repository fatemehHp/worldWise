import React from "react";
import styles from "./sidebar.module.css";
import Logo from "./Logo";
import AppNav from "./AppNav";

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav/>
      <p>list of cities</p>
      <footer className={styles.footer}>
        <p className={styles.copyright}>Lorem ipsum dolor sit amet.</p></footer>
    </div>
  );
}
