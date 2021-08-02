import { generateId } from "../../../shared/utils";
import { NOTES_STORAGE_KEY, ACTIVE_NOTE_ID } from "../../../shared/constants";

export class NotesService {
  constructor(storageService) {
    this.storageService = storageService;
  }

  getNotes() {
    return this._getNotes().then((notes) =>
      notes
        .filter((n) => !n.isDeleted)
        .sort((n1, n2) => n2.updateDate - n1.updateDate)
    );
  }

  getNoteById(id) {
    return this.getNotes().then((notes) => notes.find((n) => n.id === id));
  }

  upsertNote({ id, value }) {
    if (id !== null) return this._updateNote(id, { value });
    return this._createNote({ value });
  }

  removeNote(id) {
    return this._getNotes()
      .then((notes) => {
        const note = notes.find((n) => n.id === id);

        if (!note) {
          throw new Error("Item not found.");
        }

        note.isDeleted = true;
        note.updateDate = Date.now();

        return this._writeNotes(notes);
      })
      .then(() => {
        return id;
      });
  }

  getActiveNoteId() {
    return this._getActiveNoteId();
  }

  setActiveNoteId(id) {
    return this._writeActiveNoteId(id);
  }

  removeActiveNoteId() {
    return this._writeActiveNoteId(null);
  }

  _getNotes() {
    return this._getStorageItem(NOTES_STORAGE_KEY).then((value) => value || []);
  }

  _getActiveNoteId() {
    return this._getStorageItem(ACTIVE_NOTE_ID);
  }

  _createNote({ value }) {
    const time = Date.now();
    const note = {
      id: generateId(),
      createDate: time,
      updateDate: time,
      isDeleted: false,
      value,
    };

    return this._getNotes()
      .then((notes) => {
        return this._writeNotes([note, ...notes]);
      })
      .then(() => note);
  }

  _updateNote(id, { value }) {
    return this._getNotes().then((notes) => {
      const note = notes.find((n) => n.id === id);
      if (!note) {
        throw new Error("Item not found.");
      }

      note.value = value;
      note.updateDate = Date.now();

      return this._writeNotes(notes).then(() => note);
    });
  }

  _writeActiveNoteId(note) {
    return this._setStorageItem(ACTIVE_NOTE_ID, note);
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
