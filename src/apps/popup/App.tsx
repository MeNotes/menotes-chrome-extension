import React from "react";
import { useSettingsQuery } from "../../store/modules";
import { useSize } from "./hooks/useSize";
import styles from "./styles.module.css";
import "./styles.global.css";
import { NavBar } from "./components/Navbar";
import { ActiveNote } from "./components/ActiveNote";

export const App = (): JSX.Element => {
  useSize(document.getElementById("root"));
  useSettingsQuery();

  return (
    <main className={styles.container}>
      <NavBar />
      <ActiveNote />
    </main>
  );
};
