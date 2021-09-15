import { MESSAGE_NAMES } from "../../shared/constants";

export class App {
  constructor(gApiService) {
    this._gapi = gApiService;

    this._subscribeOnGetCalendarEvents();
  }

  _subscribeOnGetCalendarEvents() {
    chrome.extension.onMessage.addListener(
      (message, messageSender, sendResponse) => {
        const { name } = message || {};
        if (name === MESSAGE_NAMES.GET_CALENDAR_EVENTS) {
          this._gapi
            .getCalendarEvents()
            .then((events) => {
              sendResponse({ data: { events } });
            })
            .catch((error) => {
              sendResponse({ error });
            });
          return true;
        }
      }
    );
  }
}
