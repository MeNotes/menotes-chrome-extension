import { createStoreon } from "storeon";
import { storeonLogger } from "storeon/devtools";
import {
  calendarEventsModule,
  notesModule,
  NotesEvents,
  NotesState,
  CalendarEventsEvents,
  CalendarEventsState,
  SettingsEvents,
  SettingsState,
  settingsModule,
} from "./modules";

export type State = CalendarEventsState & NotesState & SettingsState;
export type Events = CalendarEventsEvents & NotesEvents & SettingsEvents;

export const store = createStoreon<State, Events>([
  calendarEventsModule,
  notesModule,
  settingsModule,
  storeonLogger,
]);
