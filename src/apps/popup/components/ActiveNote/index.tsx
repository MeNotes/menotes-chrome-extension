import React from "react";
import { Controls } from "./Controls";
import { Editor } from "./Editor";

import styles from "./styles.module.css";

export const ActiveNote = (): JSX.Element => {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Editor />
      </div>
      <div className={styles.right}>
        <Controls />
      </div>
    </div>
  );
};
