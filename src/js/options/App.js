export class App {
  constructor(storageService) {
    this.storageService = storageService;

    const clearStorageButton = document.getElementById("clear-storage-button");

    clearStorageButton.addEventListener("click", () => {
      this.storageService.clear();
    });
  }
}
