import { StoreonModule } from "storeon";
import { GoogleEvent } from "../../../shared/models";
import {
  GET_CALENDAR_EVENTS,
  GET_CALENDAR_EVENTS_ERROR,
  GET_CALENDAR_EVENTS_SUCCESS,
} from "./constants";

export interface CalendarEventsState {
  events: GoogleEvent[];
  calendarEventsError: unknown;
  calendarEventsLoading: boolean;
}

export interface CalendarEventsEvents {
  [GET_CALENDAR_EVENTS]: undefined;
  [GET_CALENDAR_EVENTS_SUCCESS]: { events: GoogleEvent[] };
  [GET_CALENDAR_EVENTS_ERROR]: { calendarEventsError: unknown };
}

export const calendarEventsModule: StoreonModule<
  CalendarEventsState,
  CalendarEventsEvents
> = (store) => {
  store.on("@init", () => ({
    events: [],
    calendarEventsLoading: false,
    calendarEventsError: undefined,
  }));

  store.on(GET_CALENDAR_EVENTS, () => ({
    events: [],
    calendarEventsLoading: true,
    calendarEventsError: undefined,
  }));
  store.on(GET_CALENDAR_EVENTS_SUCCESS, (state, payload) => ({
    events: payload.events,
    calendarEventsLoading: false,
    calendarEventsError: undefined,
  }));
  store.on(GET_CALENDAR_EVENTS_ERROR, (payload) => ({
    events: [],
    calendarEventsLoading: false,
    calendarEventsError: payload.calendarEventsError,
  }));
};
