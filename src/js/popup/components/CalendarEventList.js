import { HIDDEN_CLASS_NAME } from "../../shared/constants";

const MAX_EVENTS_LENGTH = 5;

export class CalendarEventList {
  constructor({ events, onEventClick }) {
    this._containerEl = document.getElementById("calendar-event-list");
    this._containerEl.addEventListener("click", ({ target }) => {
      if (!target.dataset.eventId) return;

      const event = events.find((e) => e.id === target.dataset.eventId);
      if (!event) {
        console.debug("Event is not found", event);
        return;
      }

      onEventClick(event);
    });

    this._events = events.slice(0, MAX_EVENTS_LENGTH);
    this._init();
  }

  _init() {
    if (!this._events.length) {
      return;
    }

    this._clearList();
    this._events.forEach((e) => {
      this._containerEl.innerHTML += this._createEvent(e);
    });
    this._containerEl.classList.remove(HIDDEN_CLASS_NAME);
  }

  _clearList() {
    this._containerEl.innerHTML = "";
  }

  _createEvent({ id, summary }) {
    return `
      <button class="calendar-event-list__item" data-event-id="${id}">
        ${summary}
      </button>
    `;
  }
}
