import { Page } from "./page";
import { Editor } from "../components/Editor";
import { CalendarEventList } from "../components/CalendarEventList";
import { toggleFullScreen } from "simplemde";

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
    this.calendarEventList = new CalendarEventList((e) =>
      this._onClickGoogleEventHandler(e)
    );

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
      });
  }

  _onClickGoogleEventHandler(event) {
    this.editor.setNote({
      value: this.notesService.getPreFilledGoogleEventNote(event),
    });
  }

  _onSaveClickHandler({ value }) {
    this.notesService.removeDraftNote().then(() => {
      if (!this.note) {
        this.notesService.createNote({ value });
        return;
      }

      this.notesService.updateNote(this.note.id, { value });
      this.note = null;
    });
  }

  _onEditorChangeHandler({ value }) {
    if (this.note) {
      return this.notesService.updateDraftNote({ ...this.note, value });
    }

    return this.notesService.updateDraftNote({ value });
  }

  _onToolbarActiveChange(value) {
    this.toolbarService.setVisibility(value);
  }
}

EditorPage.id = "editor-page";
