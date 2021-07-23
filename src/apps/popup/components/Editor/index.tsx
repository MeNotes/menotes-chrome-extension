import React, { useMemo, useState } from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

import styles from "./styles.module.css";

export const Editor = () => {
  const [editorValue, setEditorValue] = useState("");
  const editorOptions = useMemo(() => {
    return {
      autofocus: true,
      showIcons: ["code"],
      hideIcons: ["fullscreen", "side-by-side"],
      status: false,
    } as any;
  }, []);

  const onChange = (value: string) => {
    setEditorValue(value);
  };

  return (
    <section className={styles.container}>
      <SimpleMDE
        value={editorValue}
        onChange={onChange}
        options={editorOptions}
      />
    </section>
  );
};
