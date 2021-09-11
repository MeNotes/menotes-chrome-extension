import React, { useCallback } from "react";
import { EMPTY_NOTE, useNotesMutation } from "../../../../../store/modules";
import styles from "./styles.module.css";

export const Search = () => {
  const { upsertActiveNote } = useNotesMutation();

  const clearEditorValue = useCallback(() => {
    upsertActiveNote(EMPTY_NOTE);
  }, []);

  return (
    <div className={styles.container}>
      <input
        type="text"
        className={styles["search-input"]}
        placeholder="Search notes"
      />
      <button
        className="editor-page__create-button editor__toolbar-button"
        title="Create new note"
        onClick={clearEditorValue}
      >
        <i className="fa fa-edit"></i>
      </button>
    </div>
  );
};
