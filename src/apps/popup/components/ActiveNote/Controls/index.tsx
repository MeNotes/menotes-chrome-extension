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

  const copyEditorValueToClipboard = useCallback(() => {
    const note = notes.find((n) => n.id === activeNoteId);
    if (!note) return;
    if (!navigator.clipboard) {
      console.error("Clipborad is not available");
      return;
    }
    navigator.clipboard.writeText(note.value).then(
      function () {
        console.log("Async: Copying to clipboard was successful!");
      },
      function (err) {
        console.error("Async: Could not copy text: ", err);
      }
    );
  }, [activeNoteId, notes]);

  return notes.length ? (
    <div className={styles.container}>
      <button
        id="copy-note-button"
        className={`${styles.copy} ${styles.button}`}
        title="Copy to clipboard"
        onClick={copyEditorValueToClipboard}
      >
        <i className="fa fa-clipboard"></i>
      </button>
      <button
        onClick={handleRemove}
        className={`${styles.remove} ${styles.button}`}
      >
        <i className="fa fa-trash"></i>
      </button>
    </div>
  ) : null;
};
