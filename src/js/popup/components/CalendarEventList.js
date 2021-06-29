import { MESSAGE_NAMES } from "../../shared/constants";

const MAX_EVENTS_LENGTH = 5;

export class CalendarEventList {
  constructor(onClickEvent = () => {}) {
    this._containerEl = document.getElementById("template-list");
    this._getCalendarEvents();
    this._onClickEventHandler = onClickEvent;
  }

  _getCalendarEvents() {
    return new Promise((res) => {
      chrome.runtime.sendMessage(
        { name: MESSAGE_NAMES.GET_CALENDAR_EVENTS },
        res
      );
    })
      .then((result) => {
        const { data } = result || {};
        this._events = data.events;
      })
      .then(() => this._filterEvents())
      .then(() => this._render());
  }

  _render() {
    if (!this._events || !this._events.length) {
      return;
    }
    this._clearList();

    this._events.map((e) => this._createEvent(e));

    this._containerEl.style.display = "flex";
  }

  _clearList() {
    this._containerEl.innerHTML = "";
  }

  _filterEvents() {
    this._events = this._events.slice(0, MAX_EVENTS_LENGTH);
  }

  _createEvent(event) {
    const { summary } = event;
    const newDiv = document.createElement("div");
    newDiv.classList.add("template-list-item");
    newDiv.innerHTML = `${summary}`;
    newDiv.addEventListener("click", () => {
      this._onClickEventHandler(event);
    });
    this._containerEl.append(newDiv);
  }
}
