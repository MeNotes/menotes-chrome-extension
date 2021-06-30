import { Page } from "./page";
import { Editor } from "../components/Editor";
import { CalendarEventList } from "../components/CalendarEventList";
import { HIDDEN_CLASS_NAME } from "../../shared/constants";
import { debounce } from "../../shared/utils";

export class EditorPage extends Page {
  constructor(notesService, toolbarService, calendarService) {
    super(EditorPage.id);

    this.init = this.init.bind(this);
    this._loadEditor = this._loadEditor.bind(this);
    this._loadCalendarEvents = this._loadCalendarEvents.bind(this);
    this._onEditorChangeHandler = this._onEditorChangeHandler.bind(this);
    this._onToolbarActiveChange = this._onToolbarActiveChange.bind(this);
    this._onClickGoogleEventHandler =
      this._onClickGoogleEventHandler.bind(this);
    this._getPreFilledGoogleEventNote =
      this._getPreFilledGoogleEventNote.bind(this);

    this.notesService = notesService;
    this.toolbarService = toolbarService;
    this.calendarService = calendarService;

    this.calendarLoadingContainer = document.getElementById(
      "calendar-event-loader"
    );

    this.noteId = null;
    this.editorOnload = new Promise((resolve) => {
      this._loadEditor()
        .then((editor) => {
          this.editor = editor;
          return this._loadCalendarEvents();
        })
        .then(() => {
          resolve();
        });
    });
  }

  init() {
    super.init();

    this.editorOnload
      .then(() => {
        this.editor.setNote("");
        return this.notesService.getActiveNote();
      })
      .then((note) => {
        if (!note) {
          return;
        }

        this.noteId = note.id;
        this.editor.setNote(note);
      });
  }

  _loadEditor() {
    return this.toolbarService.getVisibility().then((visibility) => {
      return new Editor({
        onChange: debounce(this._onEditorChangeHandler, 300),
        isToolbarActive: visibility,
        onToolbarActiveChange: this._onToolbarActiveChange,
      });
    });
  }

  _loadCalendarEvents() {
    return this.calendarService
      .getCalendarEvents()
      .catch(() => [])
      .then((events) => {
        new CalendarEventList({
          events,
          onEventClick: this._onClickGoogleEventHandler,
        });
      })
      .finally(() => {
        this.calendarLoadingContainer.classList.add(HIDDEN_CLASS_NAME);
      });
  }

  _onClickGoogleEventHandler(event) {
    this.editor.setNote({
      value: this._getPreFilledGoogleEventNote(event),
    });
  }

  _onEditorChangeHandler({ value }) {
    console.log(this.noteId);
    if (!this.noteId) {
      return this.notesService.createNote({ value }).then((id) => {
        this.noteId = id;
        return this.notesService.setActiveNoteId(id);
      });
    }

    return this.notesService.updateNote(this.noteId, { value });
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
