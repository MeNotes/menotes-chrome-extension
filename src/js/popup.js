import "../css/popup.css";

import { App } from "./popup/App";
import { EditorPage } from "./popup/pages/EditorPage";
import { NotesPage } from "./popup/pages/NotesPage";
import { NotesService } from "./popup/services/NotesService";
import { RouterService } from "./popup/services/RouterService";

const notesService = new NotesService();
const routerService = new RouterService();

routerService.addRoute(EditorPage.id, new EditorPage(notesService));
routerService.addRoute(
  NotesPage.id,
  new NotesPage(notesService, routerService)
);

new App(routerService);
