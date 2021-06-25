import SimpleMDE from 'simplemde';
import 'simplemde/dist/simplemde.min.css'

export class Editor {
    constructor(onSave) {
        this.setNote = this.setNote.bind(this);
        this._copyTextToClipboard = this._copyTextToClipboard.bind(this);

        this.simplemde = new SimpleMDE({ element: document.getElementById('editor') });
        this.titleInput = document.getElementById('note-title-input');
        const copyButton = document.getElementById('copy-note');
        const saveButton = document.getElementById('save-note');

        copyButton.addEventListener('click', () => {
            this._copyTextToClipboard(this.getEditorValue());
        })

        saveButton.addEventListener('click', () => {
            onSave({ title: this.titleInput.value, value: this.simplemde.value() });
        })
    }

    setNote({ title, value }) {
        this.titleInput.value = title
        this.simplemde.value(value);
    }

    clear() {
        this.titleInput.value = 'Unnamed note';
        this.simplemde.value('');
    }

    _copyTextToClipboard(text) {
        if (!navigator.clipboard) {
            console.error('Clipborad is not available', err);
            return;
        }
        navigator.clipboard.writeText(text).then(function () {
            console.log('Async: Copying to clipboard was successful!');
        }, function (err) {
            console.error('Async: Could not copy text: ', err);
        });
    }
}