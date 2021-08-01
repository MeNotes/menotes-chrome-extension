import React, { useEffect, useMemo, useState } from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

import styles from "./styles.module.css";
import {
  EMPTY_NOTE,
  useNotesMutation,
  useNotesQuery,
} from "../../../../store/modules";

export const Editor = () => {
  const { notes, activeNoteId } = useNotesQuery();
  const { upsertNote, upsertActiveNote, setActiveNoteId, clearActiveNoteId } =
    useNotesMutation();

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
    const options: any = {
      autofocus: true,
      showIcons: ["code"],
      hideIcons: ["fullscreen", "side-by-side"],
      status: false,
    };
    return options;
  }, []);

  const onChange = (value: string) => {
    upsertNote({ id: activeNote.id, value });
  };

  const clearEditorValue = () => {
    upsertActiveNote(EMPTY_NOTE);
  };

  const copyEditorValueToClipboard = () => {
    if (!navigator.clipboard) {
      console.error("Clipborad is not available");
      return;
    }
    navigator.clipboard.writeText(activeNote.value).then(
      function () {
        console.log("Async: Copying to clipboard was successful!");
      },
      function (err) {
        console.error("Async: Could not copy text: ", err);
      }
    );
  };

  return (
    <section className={styles.container}>
      <button
        className="editor-page__create-button editor__toolbar-button"
        title="Create new note"
        onClick={clearEditorValue}
      >
        <i className="fa fa-edit"></i>
      </button>

      <SimpleMDE
        value={activeNote.value}
        onChange={onChange}
        options={editorOptions}
      />

      {/* 
      <button
        id="toggle-toolbar-button"
        className="editor__toolbar-toggle fa editor__toolbar-button"
        title="Toggle toolbar"
        onClick={toggleToolbar}
      ></button> */}

      <button
        id="copy-note-button"
        className="editor__toolbar-copy editor__toolbar-button"
        title="Copy to clipboard"
        onClick={copyEditorValueToClipboard}
      >
        <i className="fa fa-clipboard"></i>
      </button>
    </section>
  );
};
