import { MESSAGE_NAMES } from "../../shared/constants";

export class CalendarEventList {
  constructor() {
    this._containerEl = document.getElementById("template-list-items");
    this._getCalendarEvents();
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

  _createEvent(event) {
    const { summary } = event;
    const newDiv = document.createElement("div");
    newDiv.classList.add("template-list-item");
    newDiv.innerHTML = `${summary}`;
    this._containerEl.append(newDiv);
  }
}
