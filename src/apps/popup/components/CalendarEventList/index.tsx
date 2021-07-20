import React, { useEffect, useState } from "react";
import {
  GoogleCalendarService,
  StorageService,
} from "../../../../shared/services";
import styles from "./styles.module.css";

function useCalendarEvents() {
  const [loading, setLoading] = useState(false);
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    const storage = new StorageService();
    const calendarService = new GoogleCalendarService(storage);

    calendarService
      .getCalendarEvents()
      .then((events: any) => {
        setCalendarEvents(events);
      })
      .catch(setError)
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { loading, data: calendarEvents, error };
}

export const CalendarEventList = () => {
  const { data: events, loading, error } = useCalendarEvents();

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
              <button className={styles.list_item} data-event-id={event.id}>
                ${event.summary}
              </button>
            ))
          : null}
      </div>
    </section>
  );
};
