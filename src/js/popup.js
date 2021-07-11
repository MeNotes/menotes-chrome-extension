import "../css/popup.css";

import { App } from "./popup/App";
import { EditorPage } from "./popup/pages/EditorPage";
import { StorageService, GoogleCalendarService } from "../js/shared/services";
import {
  NotesService,
  RouterService,
  UIStateService,
  SizeService,
} from "./popup/services";
import { store } from "./popup/store";

const storageService = new StorageService();
const notesService = new NotesService(storageService);
const routerService = new RouterService();
const uiStateService = new UIStateService(storageService);
const calendarService = new GoogleCalendarService(storageService);
new SizeService(storageService);

routerService.addRoute(EditorPage.id, new EditorPage());

new App(
  { store },
  routerService,
  notesService,
  uiStateService,
  calendarService
);
