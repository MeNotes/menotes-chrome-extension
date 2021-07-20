import React from "react";
import styles from "./styles.module.css";

export const CalendarEventList = () => {
  return (
    <section className={styles.container}>
      <div id="calendar-event-loader" className="calendar-event-list">
        Loading...
      </div>
      <div id="calendar-event-error" className="calendar-event-list hidden">
        <i className="fa fa-exclamation-triangle"></i>
        Events are not available
      </div>
      <div
        id="calendar-event-list"
        className="calendar-event-list hidden"
      ></div>
    </section>
  );
};
