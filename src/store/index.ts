import { createStoreon } from "storeon";
import { storeonLogger } from "storeon/devtools";
import {
  calendarEventsModule,
  notesModule,
  NotesEvents,
  NotesState,
  CalendarEventsEvents,
  CalendarEventsState,
} from "./modules";

export type State = CalendarEventsState & NotesState;
export type Events = CalendarEventsEvents & NotesEvents;

export const store = createStoreon<State, Events>([
  calendarEventsModule,
  notesModule,
  storeonLogger,
]);
