import { EditorContainer } from "./containers/EditorContainer";
import { EditorPage } from "./pages/EditorPage";
import { NotesContainer } from "./containers/NotesContainer";
import { HIDDEN_CLASS_NAME } from "../shared/constants";

export class App {
  constructor(routerService, notesService, toolbarService, calendarService) {
    this.routerService = routerService;
    this.routerService.openPage(EditorPage.id);

    new EditorContainer(notesService, toolbarService, calendarService);
    new NotesContainer(notesService);

    const toggleSidebarButton = document.getElementById(
      "toggle-sidebar-button"
    );
    const sidebar = document.getElementById("sidebar");

    toggleSidebarButton.addEventListener("click", () => {
      sidebar.classList.toggle(HIDDEN_CLASS_NAME);
    });
  }
}
