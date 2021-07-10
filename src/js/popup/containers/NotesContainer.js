import { UPDATE_ACTIVE_NOTE_ACTION, UPDATE_NOTES_ACTION } from "../store";

const OPEN_ACTION = "open";
const REMOVE_ACTION = "remove";

const ACTIONS = [OPEN_ACTION, REMOVE_ACTION];

export class NotesContainer {
  constructor({ store }, notesService) {
    this._onItemClickHandler = this._onItemClickHandler.bind(this);
    this._renderNotesList = this._renderNotesList.bind(this);

    this.store = store;
    this.notesService = notesService;

    this.notesContainer = document.getElementById("notes-js");

    this.notesContainer.addEventListener("click", ({ target }) => {
      const noteId = target.dataset.id;
      const action = target.dataset.action;

      if (!noteId || !ACTIONS.includes(action)) {
        console.error("error", noteId, action);
        return;
      }

      this._onItemClickHandler(noteId, action);
    });

    this._renderNotesList();

    this.store.on(UPDATE_NOTES_ACTION, () => {
      this._renderNotesList();
    });
  }

  _getNoteTitle(str = "") {
    const [title] = str.split("\n");
    return title || ["Draft note..."];
  }

  _onItemClickHandler(noteId, action) {
    switch (action) {
      case OPEN_ACTION:
        this.notesService.setActiveNoteId(noteId).then(() => {
          this.store.dispatch(UPDATE_ACTIVE_NOTE_ACTION);
        });
        break;
      case REMOVE_ACTION:
        this.notesService.removeNote(noteId).then(() => {
          this.store.dispatch(UPDATE_NOTES_ACTION);
        });
        break;
      default:
        console.error("Unknown action");
    }
  }

  _renderNotesList() {
    this.notesContainer.innerHTML = "";
    this.notesService.getNotes().then((notes = []) => {
      if (!notes.length) {
        this.notesContainer.innerHTML += "No items found.";
        return;
      }

      notes.forEach(({ id, value }) => {
        const title = this._getNoteTitle(value.trim());
        this.notesContainer.innerHTML += `
          <div class="note-item" data-id="${id}" data-action="${OPEN_ACTION}">
              <div class="note-item__title" title="${title}" data-id="${id}" data-action="${OPEN_ACTION}">${title}</div>
              <div class="note-item__actions">
              <button class="button button--icon" data-id="${id}" data-action="${REMOVE_ACTION}">
                  <i class="fa fa-trash"></i>
              </button>
              </div>
          </div>
        `;
      });
    });
  }
}
