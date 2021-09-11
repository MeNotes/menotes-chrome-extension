import React from "react";
import { NotesList } from "./NotesList";
import { Search } from "./Search";
import styles from "./styles.module.css";

export const NavBar = (): JSX.Element => {
  return (
    <div className={styles.container}>
      <Search />
      <NotesList />
    </div>
  );
};
