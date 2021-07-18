import secrets from "secrets";
import { USER_OPTIONS_KEY } from "../constants";
import { MESSAGE_NAMES } from "../constants/messages";
import { UserSettings } from "../models";
import { generateId } from "../utils";
import calendar from "./calendar.json";

class BaseGoogleCalendarService {
  constructor(storageService) {
    this.storageService = storageService;
  }

  getCalendarEvents() {
    throw new Error("method should be implemented");
  }

  _isDisabled() {
    return this.storageService
      .get(USER_OPTIONS_KEY)
      .then((settings) => !Boolean(new UserSettings(settings).googleSync));
  }

  _withIds(events) {
    return events.map((e) => {
      e.id = generateId();
      return e;
    });
  }
}

class MockCalendarService extends BaseGoogleCalendarService {
  constructor(...args) {
    super(...args);
  }
  getCalendarEvents() {
    return this._isDisabled().then((isDisabled) => {
      if (isDisabled) {
        return [];
      }
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(this._withIds(calendar.events));
        }, 500);
      });
    });
  }
}

class ChromeRuntimeCalendarService extends BaseGoogleCalendarService {
  constructor(...args) {
    super(...args);
  }
  getCalendarEvents() {
    return this._isDisabled().then((isDisabled) => {
      if (isDisabled) {
        return [];
      }
      return new Promise((res) => {
        chrome.runtime.sendMessage(
          { name: MESSAGE_NAMES.GET_CALENDAR_EVENTS },
          res
        );
      }).then(({ data }) => {
        console.debug("Events data", data);
        if (!data || !data.events) {
          throw new Error("No data");
        }
        return this._withIds(data.events);
      });
    });
  }
}

export const GoogleCalendarService =
  secrets.env === "development" && !Boolean(chrome.runtime)
    ? MockCalendarService
    : ChromeRuntimeCalendarService;
