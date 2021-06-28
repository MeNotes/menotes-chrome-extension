import { NOTES_STORAGE_KEY, NOTES_DRAFT_KEY } from "../../_constants";

export class NotesService {
  constructor(storageService) {
    this.storageService = storageService;
  }

  createNote({ title, value }) {
    return this._getNotes().then((notes) => {
      return this._writeNotes([this._createNote({ title, value }), ...notes]);
    });
  }

  getNotes() {
    return this._getNotes().then((notes) => notes.filter((n) => !n.isDeleted));
  }

  getNoteById(id) {
    return this.getNotes().then((notes) => notes.find((n) => n.id === id));
  }

  updateNote(id, { title, value }) {
    return this._getNotes().then((notes) => {
      const note = notes.find((n) => n.id === id);
      if (!note) {
        throw new Error("Item not found.");
      }

      note.title = title;
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

  getDraftNote() {
    return this._getDraftNote();
  }

  updateDraftNote(note) {
    return this._writeDraftNote(note);
  }

  removeDraftNote() {
    return this._writeDraftNote(null);
  }

  _createNote({ title, value }) {
    const time = Date.now();
    return {
      id: time,
      createDate: time,
      updateDate: time,
      isDeleted: false,
      title,
      value,
    };
  }

  _getNotes() {
    return this._getStorageItem(NOTES_STORAGE_KEY).then((value) => value || []);
  }

  _getDraftNote() {
    return this._getStorageItem(NOTES_DRAFT_KEY);
  }

  _writeNotes(notes) {
    return this.storageService.set(NOTES_STORAGE_KEY, note);
  }

  _writeDraftNote(note) {
    return this.storageService.set(NOTES_DRAFT_KEY, note);
  }

  _getStorageItem(key) {
    return this.storageService.get(key);
  }
}
