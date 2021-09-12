import React, { useCallback } from "react";
import { useNotesMutation, useNotesQuery } from "../../../../../store/modules";

import styles from "./styles.module.css";

export const Controls = () => {
  const { removeNote } = useNotesMutation();
  const { activeNoteId, notes } = useNotesQuery();

  const handleRemove = useCallback(() => {
    const note = notes.find((n) => n.id === activeNoteId);
    if (!note) return;
    removeNote(note);
  }, [activeNoteId, notes]);

  return notes.length ? (
    <div className={styles.container}>
      <button
        onClick={handleRemove}
        className={`${styles.remove} ${styles.button}`}
      >
        <i className="fa fa-trash"></i>
      </button>
    </div>
  ) : null;
};
