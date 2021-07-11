import { OptionsPages } from "./pages";

export class App {
  constructor(storageService) {
    this.optionsPage = new OptionsPages(storageService);
  }
}
