import { NOTES_STORAGE_KEY } from "../../_constants";
export class NotesService {
    createNote({ title, value }) {
        const notes = this._getNotes();
        const time = Date.now()
        this._writeNotes([{
            id: time,
            createDate: time,
            updateDate: time,
            isDeleted: false,
            title,
            value,
        }, ...notes])
    }

    getNotes() {
        return this._getNotes();
    }

    getNoteById(id) {
        const notes = this._getNotes();
        return notes.find(n => n.id === id);
    }

    updateNote(id, { title, value }) {
        const notes = this._getNotes();
        const note = notes.find(n => n.id === id);

        note.title = title;
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

    _getNotes() {
        return (JSON.parse(localStorage.getItem(NOTES_STORAGE_KEY)) || []).filter(n => !n.isDeleted);
    }

    _writeNotes(notes) {
        localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(notes));
    }
}