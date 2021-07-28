import React from "react";
import { Note } from "../../../../shared/models";
import {
  useCalendarEventsQuery,
  useNotesMutation,
} from "../../../../store/modules";
import styles from "./styles.module.css";

export const CalendarEventList = () => {
  const { data, loading, error } = useCalendarEventsQuery();
  const { upsertActiveNote } = useNotesMutation();

  const onEventClick = (event: any) => {
    upsertActiveNote(new Note({ id: null, value: event.summary }));
  };

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
        {data &&
          data.length &&
          data.map((event: any) => (
            <button
              className={styles.list_item}
              key={event.id}
              onClick={() => onEventClick(event)}
            >
              ${event.summary}
            </button>
          ))}
      </div>
    </section>
  );
};
