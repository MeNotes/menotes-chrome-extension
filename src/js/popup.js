import "../css/popup.css";

import { App } from "./popup/App";
import { EditorPage } from "./popup/pages/EditorPage";
import { StorageService, GoogleCalendarService } from "../js/shared/services";
import { NotesService, RouterService, ToolbarService } from "./popup/services";

const storageService = new StorageService();
const notesService = new NotesService(storageService);
const routerService = new RouterService();
const toolbarService = new ToolbarService(storageService);
const calendarService = new GoogleCalendarService();

routerService.addRoute(EditorPage.id, new EditorPage());

new App(routerService, notesService, toolbarService, calendarService);
