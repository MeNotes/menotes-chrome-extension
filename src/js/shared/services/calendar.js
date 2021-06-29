import { MESSAGE_NAMES } from "../constants/messages";
import { events } from "./calendar.json";

class BaseGoogleCalendarService {
  getCalendarEvents() {
    throw new Error("method should be implemented");
  }

  _generateId() {
    return (Date.now() + Math.random()).toString(36);
  }

  _withIds(events) {
    return events.map((e) => {
      e.id = this._generateId();
      return e;
    });
  }
}

class MockCalendarService extends BaseGoogleCalendarService {
  getCalendarEvents() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this._withIds(events));
      }, 500);
    });
  }
}

class ChromeRuntimeCalendarService extends BaseGoogleCalendarService {
  getCalendarEvents() {
    return new Promise((res) => {
      chrome.runtime.sendMessage(
        { name: MESSAGE_NAMES.GET_CALENDAR_EVENTS },
        res
      );
    }).then(({ data }) => {
      if (!data || !data.events) {
        throw new Error("No data");
      }
      return this._withIds(events);
    });
  }
}

export const GoogleCalendarService = Boolean(chrome.runtime)
  ? ChromeRuntimeCalendarService
  : MockCalendarService;
