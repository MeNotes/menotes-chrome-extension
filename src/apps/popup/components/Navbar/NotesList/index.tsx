import React, { useCallback } from "react";
import { Note } from "../../../../../shared/models";
import { useNotesQuery, useNotesMutation } from "../../../../../store/modules";
import styles from "./styles.module.css";

interface Props {
  notes: Note[];
}

export const NotesList = ({ notes }: Props) => {
  const { setActiveNoteId } = useNotesMutation();
  const { activeNoteId } = useNotesQuery();

  const getTitle = (value: string) => {
    if (!value.length) {
      return "New note";
    }

    return value.split("\n")[0];
  };

  const onHandleClick = useCallback(
    (id: string | null) => {
      if (!id) return;
      setActiveNoteId(id);
    },
    [setActiveNoteId]
  );

  return (
    <section className={styles.container}>
      {Array.isArray(notes) &&
        notes.length > 0 &&
        notes.map((note: Note) => (
          <div
            className={`${styles.note} ${
              note.id === activeNoteId && styles.active
            }`}
            key={note.id}
            onClick={() => onHandleClick(note.id)}
          >
            <div>{getTitle(note.value)}</div>
          </div>
        ))}
    </section>
  );
};
