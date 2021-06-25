import { Page } from './page'
import { Editor } from '../components/Editor'

export class EditorPage extends Page {
    constructor(notesService) {
        super(EditorPage.id);

        this.init = this.init.bind(this);
        this._onSaveClickHandler = this._onSaveClickHandler.bind(this);

        this.notesService = notesService;

        this.note = null;
        this.editor = new Editor(this._onSaveClickHandler);
    }

    init([id]) {
        super.init();
        if (!id) {
            this.editor.clear();
            return;
        };

        this.note = this.notesService.getNoteById(id);
        if (!this.note) return;

        this.editor.setNote(this.note);
    }

    _onSaveClickHandler({ title, value }) {
        if (!this.note) {
            this.notesService.createNote({ title, value });
            return;
        }

        this.notesService.updateNote(this.note.id, { title, value });
    }
}

EditorPage.id = 'editor-page';