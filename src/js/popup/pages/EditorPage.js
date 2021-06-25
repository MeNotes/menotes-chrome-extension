import { Page } from './page'
import { Editor } from '../components/Editor'

export class EditorPage extends Page {
    constructor(notesService) {
        super(EditorPage.id);

        this.init = this.init.bind(this);
        this._onSaveClickHandler = this._onSaveClickHandler.bind(this);
        this._onEditorChangeHandler = this._onEditorChangeHandler.bind(this);

        this.notesService = notesService;

        this.note = null;
        this.editor = new Editor(this._onSaveClickHandler, this._onEditorChangeHandler);
    }

    init([id]) {
        super.init();

        const note = id && this.notesService.getNoteById(id);
        if (note) {
            this.note = note;
            this.notesService.updateDraftNote(note);
        }

        const draftNote = this.notesService.getDraftNote();
        if (draftNote && draftNote.id) this.note = draftNote;
        if (draftNote) {
            this.editor.setNote(draftNote);
            return;
        }

        this.editor.setNote({ title: 'Unnamed note', value: '' });
    }

    _onSaveClickHandler({ title, value }) {
        this.notesService.removeDraftNote();

        if (!this.note) {
            this.notesService.createNote({ title, value });
            return;
        }

        this.notesService.updateNote(this.note.id, { title, value });
        this.note = null;
    }

    _onEditorChangeHandler({ title, value }) {
        if (this.note) {
            this.notesService.updateDraftNote({ ...this.note, title, value });
            return;
        }

        this.notesService.updateDraftNote({ title, value });
    }
}

EditorPage.id = 'editor-page';