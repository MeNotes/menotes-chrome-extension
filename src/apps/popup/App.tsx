import React from "react";
import { useSettingsQuery } from "../../store/modules";
import { CalendarEventList } from "./components/CalendarEventList";
import { Editor } from "./components/Editor";
import { NotesList } from "./components/NotesList";
import { useSize } from "./hooks/useSize";
import styles from "./styles.module.css";
import "./styles.css";

export const App = (): JSX.Element => {
  useSize(document.getElementById("root"));
  useSettingsQuery();

  return (
    <main className={styles.container}>
      <CalendarEventList />
      <Editor />
      <NotesList />
    </main>
  );
};
