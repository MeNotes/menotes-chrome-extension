import SimpleMDE from "simplemde";
import "simplemde/dist/simplemde.min.css";

export class Editor {
  constructor({ onSave, onChange, isToolbarActive, onToolbarActiveChange }) {
    this.setNote = this.setNote.bind(this);
    this._copyTextToClipboard = this._copyTextToClipboard.bind(this);
    this._onChangeHandler = this._onChangeHandler.bind(this);

    this.simplemde = new SimpleMDE({
      element: document.getElementById("editor"),
      autofocus: true,
      showIcons: ["code"],
      hideIcons: ["fullscreen", "side-by-side"],
      status: false,
    });

    this.titleInput = document.getElementById("note-title-input");
    const toolbar = document.querySelector(".editor-toolbar");

    const copyButton = document.getElementById("copy-note");
    const saveButton = document.getElementById("save-note");
    const toolbarToggleButton = document.getElementById(
      "toggle-toolbar-button"
    );

    copyButton.addEventListener("click", () => {
      this._copyTextToClipboard(this.getEditorValue());
    });

    saveButton.addEventListener("click", () => {
      onSave({ title: this.titleInput.value, value: this.simplemde.value() });
    });

    this.titleInput.addEventListener("change", this._onChangeHandler(onChange));
    this.simplemde.codemirror.on("change", this._onChangeHandler(onChange));

    if (!isToolbarActive) {
      toolbarToggleButton.classList.add("inactive");
      toolbar.classList.add("hidden");
    }

    toolbarToggleButton.addEventListener("click", () => {
      toolbarToggleButton.classList.toggle("inactive");
      toolbar.classList.toggle("hidden");
      onToolbarActiveChange(!toolbar.classList.contains("hidden"));
    });
  }

  setNote({ title, value }) {
    this.titleInput.value = title;
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
      callback({ title: this.titleInput.value, value: this.simplemde.value() });
    };
  }
}
