import { useEffect } from "react";
import { useStoreon } from "storeon/react";
import { GoogleEvent } from "../../../shared/models";
import {
  GoogleCalendarService,
  StorageService,
} from "../../../shared/services";
import {
  GET_CALENDAR_EVENTS,
  GET_CALENDAR_EVENTS_ERROR,
  GET_CALENDAR_EVENTS_SUCCESS,
} from "./constants";
import { CalendarEventsEvents, CalendarEventsState } from "./reducer";

export function useCalendarEventsQuery() {
  const { dispatch, events, calendarEventsLoading, calendarEventsError } =
    useStoreon<CalendarEventsState, CalendarEventsEvents>("events");

  useEffect(() => {
    const storage = new StorageService();
    const calendarService = new GoogleCalendarService(storage);

    dispatch(GET_CALENDAR_EVENTS);

    calendarService
      .getCalendarEvents()
      .then((events: GoogleEvent[]) => {
        dispatch(GET_CALENDAR_EVENTS_SUCCESS, { events });
      })
      .catch((calendarEventsError: unknown) => {
        dispatch(GET_CALENDAR_EVENTS_ERROR, { calendarEventsError });
      });
  }, [dispatch]);

  return {
    data: events,
    loading: calendarEventsLoading,
    error: calendarEventsError,
  };
}
