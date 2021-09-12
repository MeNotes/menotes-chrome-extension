import React, { useCallback, useState } from "react";
import { Note } from "../../../../../shared/models";
import { EMPTY_NOTE, useNotesMutation } from "../../../../../store/modules";
import styles from "./styles.module.css";

interface Props {
  onChange?: (value: string) => void;
}

export const Search = ({ onChange }: Props) => {
  const { upsertActiveNote } = useNotesMutation();
  const [query, setQuery] = useState<string>("");

  const onChangeSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setQuery(value);
      onChange && onChange(value);
    },
    [onChange]
  );

  const create = useCallback(() => {
    let note = EMPTY_NOTE;
    if (query) {
      note = new Note({ id: null, value: query });
    }
    upsertActiveNote(note);
  }, [query]);

  return (
    <div className={styles.container}>
      <input
        type="search"
        className={styles["search-input"]}
        placeholder="Search notes"
        value={query}
        onChange={onChangeSearch}
      />
      <button
        className={styles.button}
        title="Create new note"
        onClick={create}
      >
        <i className="fa fa-edit"></i>
      </button>
    </div>
  );
};
