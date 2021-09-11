import { Editor } from "../components/ActiveNote/Editor";
import { CalendarEventList } from "../components/ActiveNote/CalendarEventList";
import { HIDDEN_CLASS_NAME } from "../../shared/constants";
import { debounce } from "../../shared/utils";
import { UPDATE_ACTIVE_NOTE_ACTION, UPDATE_NOTES_ACTION } from "../../store";

export class EditorContainer {
  constructor({ store }, notesService, uiStateService, calendarService) {
    this._loadEditor = this._loadEditor.bind(this);
    this._loadCalendarEvents = this._loadCalendarEvents.bind(this);
    this._onEditorChangeHandler = this._onEditorChangeHandler.bind(this);
    this._onToolbarActiveChange = this._onToolbarActiveChange.bind(this);
    this._onClearClickHandler = this._onClearClickHandler.bind(this);
    this._onClickGoogleEventHandler =
      this._onClickGoogleEventHandler.bind(this);
    this._getPreFilledGoogleEventNote =
      this._getPreFilledGoogleEventNote.bind(this);

    this.store = store;
    this.notesService = notesService;
    this.uiStateService = uiStateService;
    this.calendarService = calendarService;

    this.calendarLoadingContainer = document.getElementById(
      "calendar-event-loader"
    );
    this.calendarErrorContainer = document.getElementById(
      "calendar-event-error"
    );

    this.noteId = null;
    this.editorLoaded = new Promise((resolve) => {});

    this._loadEditor()
      .then((editor) => {
        this.editor = editor;
        return this._loadCalendarEvents();
      })
      .then(() => {
        this.editor.clear();
        return this.notesService.getActiveNote();
      })
      .then((note) => {
        if (!note) {
          this.noteId = null;
          this.editor.clear();
          return;
        }

        this.noteId = note.id;
        this.editor.setNote(note);
      });

    this.store.on(UPDATE_ACTIVE_NOTE_ACTION, () => {
      this.notesService.getActiveNote().then((note) => {
        if (!note) {
          this.noteId = null;
          this.editor.clear();
          return;
        }
        this.noteId = note.id;
        this.editor.setNote(note);
      });
    });
  }

  _loadEditor() {
    return this.uiStateService.getToolbarVisibility().then((visibility) => {
      return new Editor({
        onClear: this._onClearClickHandler,
        onChange: debounce(this._onEditorChangeHandler, 300),
        isToolbarActive: visibility,
        onToolbarActiveChange: this._onToolbarActiveChange,
      });
    });
  }

  _loadCalendarEvents() {
    return this.calendarService
      .getCalendarEvents()
      .then((events) => {
        new CalendarEventList({
          events,
          onEventClick: this._onClickGoogleEventHandler,
        });
      })
      .catch(() => {
        this.calendarErrorContainer.classList.remove(HIDDEN_CLASS_NAME);
      })
      .finally(() => {
        this.calendarLoadingContainer.classList.add(HIDDEN_CLASS_NAME);
      });
  }

  _onClickGoogleEventHandler(event) {
    return this.notesService.removeActiveNoteId().then(() => {
      this.noteId = null;
      this.editor.setNote({
        value: this._getPreFilledGoogleEventNote(event),
      });
    });
  }

  _onEditorChangeHandler({ value }) {
    if ((!this.noteId && !value) || !value.length) {
      return;
    }

    if (!this.noteId) {
      return this.notesService.createNote({ value }).then((id) => {
        this.noteId = id;
        return this.notesService.setActiveNoteId(id).then(() => {
          this.store.dispatch(UPDATE_NOTES_ACTION);
        });
      });
    }

    return this.notesService.updateNote(this.noteId, { value }).then(() => {
      this.store.dispatch(UPDATE_NOTES_ACTION);
    });
  }

  _onToolbarActiveChange(value) {
    this.uiStateService.setToolbarVisibility(value);
  }

  _getPreFilledGoogleEventNote(event) {
    const eventDate = new Date(event.start.dateTime);
    let dd = eventDate.getDate();
    let mm = eventDate.getMonth() + 1;
    const year = eventDate.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    const date = `${dd}/${mm}/${year}`;
    const agenda = event.description
      ? `### Agenda \n \n ${event.description}`
      : "";
    return `## ${event.summary || ""} (${date}) \n \n ${agenda}`;
  }

  _onClearClickHandler() {
    return this.notesService.removeActiveNoteId().then(() => {
      this.noteId = null;
      this.editor.clear();
    });
  }
}
