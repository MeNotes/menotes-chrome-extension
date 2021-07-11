import "../css/popup.css";

import { App } from "./popup/App";
import { EditorPage } from "./popup/pages/EditorPage";
import { NotesPage } from "./popup/pages/NotesPage";
import { StorageService, GoogleCalendarService } from "../js/shared/services";
import {
  NotesService,
  RouterService,
  SizeService,
  ToolbarService,
} from "./popup/services";

const storageService = new StorageService();
const notesService = new NotesService(storageService);
const routerService = new RouterService();
const toolbarService = new ToolbarService(storageService);
const calendarService = new GoogleCalendarService(storageService);
new SizeService(storageService);

routerService.addRoute(
  EditorPage.id,
  new EditorPage(notesService, toolbarService, calendarService)
);
routerService.addRoute(
  NotesPage.id,
  new NotesPage(notesService, routerService)
);

new App(routerService);
