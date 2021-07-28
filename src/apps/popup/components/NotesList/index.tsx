import React from "react";
import { Note } from "../../../../shared/models";
import { useNotesQuery, useNotesMutation } from "../../../../store/modules";
import styles from "./styles.module.css";

export const NotesList = () => {
  const { notes } = useNotesQuery();
  const { removeNote, setActiveNoteId } = useNotesMutation();

  const getTitle = (value: string) => {
    if (!value.length) {
      return "New note";
    }

    return value.split("\n")[0];
  };

  return (
    <section className={styles.container}>
      {Array.isArray(notes) && !notes.length && <div>No notes</div>}

      {Array.isArray(notes) &&
        notes.length > 0 &&
        notes.map((note: Note) => (
          <div
            className={styles.note}
            key={note.id}
            onClick={() => setActiveNoteId(note.id)}
          >
            <div>{getTitle(note.value)}</div>
            <div>
              <button onClick={() => removeNote(note)}>
                <i className="fa fa-trash"></i>
              </button>
            </div>
          </div>
        ))}
    </section>
  );
};
