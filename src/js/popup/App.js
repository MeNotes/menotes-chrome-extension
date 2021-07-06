import { EditorContainer } from "./containers/EditorContainer";
import { EditorPage } from "./pages/EditorPage";
import { NotesContainer } from "./containers/NotesContainer";

export class App {
  constructor(routerService, notesService, toolbarService, calendarService) {
    this.routerService = routerService;

    this.routerService.openPage(EditorPage.id);

    const navigationContainer = document.getElementById("navigation");
    navigationContainer.addEventListener("click", ({ target }) => {
      if (target.dataset.pageId === undefined) return;
      this.routerService.openPage(target.dataset.pageId);
    });

    new EditorContainer(notesService, toolbarService, calendarService);
    new NotesContainer(notesService);
  }
}
