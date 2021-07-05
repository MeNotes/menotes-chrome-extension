import secrets from "secrets";
import { GoogleEvent } from "../models/GoogleEvent";
const DISCOVERY_DOCS = [
  "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
];
const MAX_METHOD_CALL_ATTEMPTS = 2;

export class GApi {
  static instance(...args) {
    if (!GApi._instance) {
      GApi._instance = new GApi(...args);
    }
    return GApi._instance;
  }

  constructor() {
    if (!gapi || !gapi.client || !gapi.client.init) {
      throw new Error("gapi.client.init is not defined");
    }

    if (!secrets.API_GOOGLE_KEY) {
      throw new Error("API TOKEN is not passed!");
    }

    this.gapiClient = gapi.client
      .init({
        apiKey: secrets.API_GOOGLE_KEY,
        discoveryDocs: DISCOVERY_DOCS,
      })
      .then(() => this._refreshToken());
  }

  getCalendarEvents() {
    return this._withAuthErrorCatch(
      this.gapiClient.then(() => this._getCalendarEvents())
    );
  }

  _getCalendarEvents() {
    return gapi.client.calendar.events
      .list({
        calendarId: "primary",
        timeMin: new Date().toISOString(),
        showDeleted: false,
        singleEvents: true,
        maxResults: 10,
        orderBy: "startTime",
      })
      .then(function (response) {
        if (!response || !response.result || !response.result.items) {
          throw new Error("Events can not be fetched");
        }
        return response.result.items.map((item) => new GoogleEvent(item));
      });
  }

  _getAccessToken() {
    return new Promise((resolve, reject) => {
      if (!chrome || !chrome.identity || !chrome.identity.getAuthToken) {
        return reject(
          new Error("chrome.identity.getAuthToken is not defined!")
        );
      }

      chrome.identity.getAuthToken(
        { interactive: true },
        function (accessToken) {
          if (chrome.runtime.lastError) {
            return reject(chrome.runtime.lastError);
          }
          if (!accessToken) {
            return reject("Token is not defined");
          }
          resolve(accessToken);
        }
      );
    });
  }

  _setAccessToken(accessToken) {
    if (!gapi || !gapi.auth || !gapi.auth.setToken) {
      throw new Error("gapi.auth.setToken is not defined!");
    }
    gapi.auth.setToken({
      access_token: accessToken,
    });
  }

  _refreshToken() {
    return this._getAccessToken()
      .then(this._setAccessToken)
      .then(
        setTimeout(() => {
          this._setAccessToken("uytrewq");
        }, 3000)
      );
  }

  _withAuthErrorCatch(resolver, attempt = 1) {
    return resolver.catch(({ result }) => {
      if (
        result &&
        result.error &&
        result.error.code === 401 &&
        attempt < MAX_METHOD_CALL_ATTEMPTS
      ) {
        return this._refreshToken().then(() =>
          this._withAuthErrorCatch(resolver, attempt + 1)
        );
      }

      throw result.error;
    });
  }
}
