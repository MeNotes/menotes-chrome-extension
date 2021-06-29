
import { NOTES_STORAGE_KEY, NOTES_DRAFT_KEY } from '../../_constants';

export class NotesService {
    createNote({  value }) {
        const notes = this._getNotes();
        this._writeNotes([this._createNote({  value }), ...notes]);
    }

    getNotes() {
        return this._getNotes().filter(n => !n.isDeleted);
    }

    getNoteById(id) {
        const notes = this._getNotes();
        return notes.find(n => n.id === id);
    }

    updateNote(id, {  value }) {
        const notes = this._getNotes();
        const note = notes.find(n => n.id === id);

        note.value = value;
        note.updateDate = Date.now()

        this._writeNotes(notes);
    }

    removeNote(id) {
        const notes = this._getNotes();
        const note = notes.find(n => n.id === id);

        if (!note) {
            console.error('No item found.');
            return;
        }

        note.isDeleted = true;
        note.updateDate = Date.now()

        this._writeNotes(notes);
    }

    getDraftNote() {
        return this._getDraftNote();
    }

    updateDraftNote(note) {
        this._writeDraftNote(note);
    }

    removeDraftNote() {
        this._writeDraftNote(null);
    }

    _createNote({ value }) {
        const time = Date.now()
        return {
            id: time,
            createDate: time,
            updateDate: time,
            isDeleted: false,
            value,
        }
    }

    _getNotes() {
        return (this._getLocalStorageItem(NOTES_STORAGE_KEY) || []);
    }

    _getDraftNote() {
        return this._getLocalStorageItem(NOTES_DRAFT_KEY);
    }

    _writeNotes(notes) {
        localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(notes));
    }

    _writeDraftNote(note) {
        localStorage.setItem(NOTES_DRAFT_KEY, JSON.stringify(note));
    }

    _getLocalStorageItem(key) {
        const item = localStorage.getItem(key);
        if (item) return JSON.parse(item);
    }
}
