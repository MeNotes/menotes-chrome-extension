import { Page } from "./page";
import { Editor } from "../components/Editor";

export class EditorPage extends Page {
  constructor(notesService, toolbarService) {
    super(EditorPage.id);

    this.init = this.init.bind(this);
    this._onSaveClickHandler = this._onSaveClickHandler.bind(this);
    this._onEditorChangeHandler = this._onEditorChangeHandler.bind(this);
    this._onToolbarActiveChange = this._onToolbarActiveChange.bind(this);

    this.notesService = notesService;
    this.toolbarService = toolbarService;

    this.note = null;

    this.toolbarService.getVisibility().then((value) => {
      this.editor = new Editor({
        onSave: this._onSaveClickHandler,
        onChange: this._onEditorChangeHandler,
        isToolbarActive: value,
        onToolbarActiveChange: this._onToolbarActiveChange,
      });
    });
  }

  init([id]) {
    super.init();

    this.notesService
      .getNoteById(id)
      .then((note) => {
        if (note) {
          this.note = note;
          return this.notesService.updateDraftNote(note);
        }
      })
      .then(() => this.notesService.getDraftNote())
      .then((draftNote) => {
        if (draftNote && draftNote.id) this.note = draftNote;
        if (draftNote) {
          this.editor.setNote(draftNote);
          return;
        }

        this.editor.setNote({ title: "Unnamed note", value: "" });
      });
  }

  _onSaveClickHandler({ title, value }) {
    this.notesService.removeDraftNote().then(() => {
      if (!this.note) {
        this.notesService.createNote({ title, value });
        return;
      }

      this.notesService.updateNote(this.note.id, { title, value });
      this.note = null;
    });
  }

  _onEditorChangeHandler({ title, value }) {
    if (this.note) {
      return this.notesService.updateDraftNote({ ...this.note, title, value });
    }

    return this.notesService.updateDraftNote({ title, value });
  }

  _onToolbarActiveChange(value) {
    this.toolbarService.setVisibility(value);
  }
}

EditorPage.id = "editor-page";
