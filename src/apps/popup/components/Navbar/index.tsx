import React, { useCallback, useEffect, useState } from "react";
import { useNotesQuery } from "../../../../store/modules";
import { NotesList } from "./NotesList";
import { Search } from "./Search";
import styles from "./styles.module.css";

export const NavBar = (): JSX.Element => {
  const { notes } = useNotesQuery();
  const [sortedNotes, setSortedNotes] = useState(notes);
  const [activeQuery, setActiveQuery] = useState("");

  useEffect(() => {
    if (!activeQuery) {
      setSortedNotes(notes);
    }
    const sorted = notes.filter((n) => n.value.includes(activeQuery));
    setSortedNotes(sorted);
  }, [notes, activeQuery]);

  const onHandleSearch = useCallback(
    (query: string) => {
      setActiveQuery(query);
    },
    [notes]
  );

  return (
    <div className={styles.container}>
      <Search onChange={onHandleSearch} />
      <NotesList notes={sortedNotes} />
    </div>
  );
};
