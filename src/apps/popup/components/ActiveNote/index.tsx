import React from "react";
import { CalendarEventList } from "./CalendarEventList";
import { Editor } from "./Editor";

import styles from "./styles.module.css";

export const ActiveNote = (): JSX.Element => {
  return (
    <div className={styles.container}>
      {/* <CalendarEventList /> */}
      <Editor />
    </div>
  );
};
