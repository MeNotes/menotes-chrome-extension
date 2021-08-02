import React from "react";
import { CalendarEventList } from "./components/CalendarEventList";
import { Editor } from "./components/Editor";
import { NotesList } from "./components/NotesList";
import styles from "./styles.module.css";

export const App = (): JSX.Element => {
  return (
    <main className={styles.container}>
      <CalendarEventList />
      <Editor />
      <NotesList />
    </main>
  );
};
