import React, { useEffect, useMemo, useState } from "react";
import SimpleMDE, { SimpleMDEReactProps } from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import "./overrides.css";

import styles from "./styles.module.css";
import {
  EMPTY_NOTE,
  useNotesMutation,
  useNotesQuery,
} from "../../../../../store/modules";

export const Editor = () => {
  const { notes, activeNoteId } = useNotesQuery();
  const { upsertNote, setActiveNoteId, clearActiveNoteId } = useNotesMutation();

  const [activeNote, setActiveNote] = useState(EMPTY_NOTE);

  useEffect(() => {
    setActiveNote(EMPTY_NOTE);

    if (!notes || !notes.length) {
      return;
    }

    if (!activeNoteId) {
      setActiveNoteId(notes[0].id);
      setActiveNote(notes[0]);
      return;
    }

    const note = notes.find((n) => n.id === activeNoteId);
    if (!note) {
      clearActiveNoteId();
      return;
    }

    setActiveNote(note);
  }, [notes, activeNoteId]);

  const editorOptions = useMemo(() => {
    const options: SimpleMDEReactProps["options"] = {
      autofocus: true,
      showIcons: ["code"],
      hideIcons: ["fullscreen", "side-by-side"],
      status: false,
      minHeight: "100%",
    };
    return options;
  }, []);

  const onChange = (value: string) => {
    upsertNote({ id: activeNote.id, value });
  };

  return (
    <section className={styles.container}>
      <SimpleMDE
        value={activeNote.value}
        onChange={onChange}
        options={editorOptions}
      />

      {/* <button
        id="toggle-toolbar-button"
        className="editor__toolbar-toggle fa editor__toolbar-button"
        title="Toggle toolbar"
        onClick={toggleToolbar}
      ></button> */}
    </section>
  );
};
