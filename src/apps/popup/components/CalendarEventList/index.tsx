import React from "react";
import { useStoreon } from "storeon/react";
import {
  CalendarEventsEvents,
  CalendarEventsState,
} from "../../../../store/modules";
import styles from "./styles.module.css";

export const CalendarEventList = () => {
  const { events, error, loading } = useStoreon<
    CalendarEventsState,
    CalendarEventsEvents
  >("events");
  return (
    <section className={styles.container}>
      {loading && (
        <div id="calendar-event-loader" className={styles.loader}>
          Loading...
        </div>
      )}
      {error && (
        <div id="calendar-event-error">
          <i className="fa fa-exclamation-triangle"></i>
          Events are not available
        </div>
      )}
      <div id="calendar-event-list" className={styles.calendar_event_list}>
        {events && events.length
          ? events.map((event: any) => (
              <button className={styles.list_item} key={event.id}>
                ${event.summary}
              </button>
            ))
          : null}
      </div>
    </section>
  );
};
