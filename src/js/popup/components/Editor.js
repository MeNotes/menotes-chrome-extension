import SimpleMDE from "simplemde";
import "simplemde/dist/simplemde.min.css";

export class Editor {
  constructor(onSave, onChange) {
    this.setNote = this.setNote.bind(this);
    this._copyTextToClipboard = this._copyTextToClipboard.bind(this);
    this._onChangeHandler = this._onChangeHandler.bind(this);

    this.simplemde = new SimpleMDE({
      element: document.getElementById("editor"),
    });
    const copyButton = document.getElementById("copy-note");
    const saveButton = document.getElementById("save-note");

    copyButton.addEventListener("click", () => {
      this._copyTextToClipboard(this.getEditorValue());
    });

    saveButton.addEventListener("click", () => {
      onSave({ value: this.simplemde.value() });
    });

    this.simplemde.codemirror.on("change", this._onChangeHandler(onChange));
  }

  setNote({ value }) {
    this.simplemde.value(value);
  }

  _copyTextToClipboard(text) {
    if (!navigator.clipboard) {
      console.error("Clipborad is not available", err);
      return;
    }
    navigator.clipboard.writeText(text).then(
      function () {
        console.log("Async: Copying to clipboard was successful!");
      },
      function (err) {
        console.error("Async: Could not copy text: ", err);
      }
    );
  }

  _onChangeHandler(callback) {
    return () => {
      callback({ value: this.simplemde.value() });
    };
  }
}
