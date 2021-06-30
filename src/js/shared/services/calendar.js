import secrets from "secrets";
import { MESSAGE_NAMES } from "../constants/messages";
import { generateId } from "../utils";
import { events } from "./calendar.json";

class BaseGoogleCalendarService {
  getCalendarEvents() {
    throw new Error("method should be implemented");
  }

  _withIds(events) {
    return events.map((e) => {
      e.id = generateId();
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
      return this._withIds(data.events);
    });
  }
}

export const GoogleCalendarService =
  secrets.env === "development" && !Boolean(chrome.runtime)
    ? MockCalendarService
    : ChromeRuntimeCalendarService;
