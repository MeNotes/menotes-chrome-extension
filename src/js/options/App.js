import { NOTES_STORAGE_KEY } from '../_constants';

export class App {
    constructor() {
        const clearStorageButton = document.getElementById('clear-storage-button');

        clearStorageButton.addEventListener('click', () => {
            localStorage.removeItem(NOTES_STORAGE_KEY);
        })
    }
}