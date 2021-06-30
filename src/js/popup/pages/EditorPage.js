import { Page } from "./page";
import { Editor } from "../components/Editor";
import { CalendarEventList } from "../components/CalendarEventList";
import { HIDDEN_CLASS_NAME } from "../../shared/constants";

export class EditorPage extends Page {
  constructor(notesService, toolbarService, calendarService) {
    super(EditorPage.id);

    this.init = this.init.bind(this);
    this._onSaveClickHandler = this._onSaveClickHandler.bind(this);
    this._onEditorChangeHandler = this._onEditorChangeHandler.bind(this);
    this._onToolbarActiveChange = this._onToolbarActiveChange.bind(this);
    this._onClickGoogleEventHandler =
      this._onClickGoogleEventHandler.bind(this);
    this._getPreFilledGoogleEventNote =
      this._getPreFilledGoogleEventNote.bind(this);

    this.notesService = notesService;
    this.toolbarService = toolbarService;
    this.calendarService = calendarService;

    const calendarLoadingContainer = document.getElementById(
      "calendar-event-loader"
    );

    this.note = null;

    this.calendarService
      .getCalendarEvents()
      .catch(() => [])
      .then((events) => {
        new CalendarEventList({
          events,
          onEventClick: this._onClickGoogleEventHandler,
        });
      })
      .finally(() => {
        calendarLoadingContainer.classList.add(HIDDEN_CLASS_NAME);
      });

    this.toolbarService.getVisibility().then((visibility) => {
      this.editor = new Editor({
        onSave: this._onSaveClickHandler,
        onChange: this._onEditorChangeHandler,
        isToolbarActive: visibility,
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
      value: this._getPreFilledGoogleEventNote(event),
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

  _getCalendarEvents() {
    return new Promise((res) => {
      chrome.runtime.sendMessage(
        { name: MESSAGE_NAMES.GET_CALENDAR_EVENTS },
        res
      );
    }).then((result) => {
      const { data } = result || {};
      this._events = data.events;
    });
  }

  _getPreFilledGoogleEventNote(event) {
    const eventDate = new Date(event.start.dateTime);
    let dd = eventDate.getDate();
    let mm = eventDate.getMonth() + 1;
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    const date = `${dd}/${mm}`;
    const agenda = event.description
      ? `### Agenda \n \n ${event.description}`
      : "";
    return `## ${event.summary} (${date}) \n \n ${agenda}`;
  }
}

EditorPage.id = "editor-page";
