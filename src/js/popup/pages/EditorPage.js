import { Page } from "./page";
import { Editor } from "../components/Editor";
import { EventList } from "../components/EventList";

export class EditorPage extends Page {
  constructor(notesService) {
    super(EditorPage.id);

    this.init = this.init.bind(this);
    this._onSaveClickHandler = this._onSaveClickHandler.bind(this);
    this._onEditorChangeHandler = this._onEditorChangeHandler.bind(this);

    this.notesService = notesService;

    this.note = null;
    this.editor = new Editor(
      this._onSaveClickHandler,
      this._onEditorChangeHandler
    );
    this.eventList = new EventList();
  }

  init([id]) {
    super.init();

    const note = id && this.notesService.getNoteById(id);
    if (note) {
      this.note = note;
      this.notesService.updateDraftNote(note);
    }

    const draftNote = this.notesService.getDraftNote();
    if (draftNote && draftNote.id) this.note = draftNote;
    if (draftNote) {
      this.editor.setNote(draftNote);
      return;
    }

    this.editor.setNote({ value: "" });
  }

  _onSaveClickHandler({ value }) {
    this.notesService.removeDraftNote();

    if (!this.note) {
      this.notesService.createNote({ value });
      return;
    }

    this.notesService.updateNote(this.note.id, { value });
    this.note = null;
  }

  _onEditorChangeHandler({ value }) {
    if (this.note) {
      this.notesService.updateDraftNote({ ...this.note, value });
      return;
    }

    this.notesService.updateDraftNote({ value });
  }
}

EditorPage.id = "editor-page";
