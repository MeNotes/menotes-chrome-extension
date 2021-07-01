import { generateId } from "../../shared/utils";
import { NOTES_STORAGE_KEY, ACTIVE_NOTE_ID } from "../../shared/constants";

export class NotesService {
  constructor(storageService) {
    this.storageService = storageService;
  }

  createNote({ value }) {
    const note = this._createNote({ value });

    return this._getNotes()
      .then((notes) => {
        this._writeNotes([note, ...notes]);
      })
      .then(() => note.id);
  }

  getNotes() {
    return this._getNotes().then((notes) => notes.filter((n) => !n.isDeleted));
  }

  getNoteById(id) {
    return this.getNotes().then((notes) => notes.find((n) => n.id === id));
  }

  updateNote(id, { value }) {
    return this._getNotes().then((notes) => {
      const note = notes.find((n) => n.id === id);
      if (!note) {
        throw new Error("Item not found.");
      }

      note.value = value;
      note.updateDate = Date.now();

      return this._writeNotes(notes);
    });
  }

  removeNote(id) {
    return this._getNotes().then((notes) => {
      const note = notes.find((n) => n.id === id);

      if (!note) {
        throw new Error("Item not found.");
      }

      note.isDeleted = true;
      note.updateDate = Date.now();

      return this._writeNotes(notes);
    });
  }

  getActiveNote() {
    return this._getActiveNoteId().then((id) => {
      if (!id) {
        return;
      }

      return this.getNoteById(id);
    });
  }

  setActiveNoteId(id) {
    return this._writeActiveNoteId(id);
  }

  removeActiveNoteId() {
    return this._writeActiveNoteId(null);
  }

  _createNote({ value }) {
    const time = generateId();
    return {
      id: time,
      createDate: time,
      updateDate: time,
      isDeleted: false,
      value,
    };
  }

  _getNotes() {
    return this._getStorageItem(NOTES_STORAGE_KEY).then((value) => value || []);
  }

  _getActiveNoteId() {
    return this._getStorageItem(ACTIVE_NOTE_ID);
  }

  _writeActiveNoteId(id) {
    return this._setStorageItem(ACTIVE_NOTE_ID, id);
  }

  _writeNotes(notes) {
    return this._setStorageItem(NOTES_STORAGE_KEY, notes);
  }

  _getStorageItem(key) {
    return this.storageService.get(key);
  }

  _setStorageItem(key, value) {
    return this.storageService.set(key, value);
  }
}
