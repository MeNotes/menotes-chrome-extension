import { StoreonModule } from "storeon";
import { GoogleEvent } from "../../../shared/models";
import {
  GET_CALENDAR_EVENTS,
  GET_CALENDAR_EVENTS_ERROR,
  GET_CALENDAR_EVENTS_SUCCESS,
} from "./constants";

export interface CalendarEventsState {
  events: GoogleEvent[];
  error: unknown;
  loading: boolean;
}

export interface CalendarEventsEvents {
  [GET_CALENDAR_EVENTS]: undefined;
  [GET_CALENDAR_EVENTS_SUCCESS]: { events: GoogleEvent[] };
  [GET_CALENDAR_EVENTS_ERROR]: { error: unknown };
}

export const calendarEventsModule: StoreonModule<
  CalendarEventsState,
  CalendarEventsEvents
> = (store) => {
  store.on("@init", () => ({ events: [], loading: false, error: undefined }));
  store.on(GET_CALENDAR_EVENTS, () => ({
    events: [],
    loading: true,
    error: undefined,
  }));
  store.on(GET_CALENDAR_EVENTS_SUCCESS, (state, payload) => ({
    events: payload.events,
    loading: false,
    error: undefined,
  }));
  store.on(GET_CALENDAR_EVENTS_ERROR, (payload) => ({
    events: [],
    loading: false,
    error: payload.error,
  }));
};
