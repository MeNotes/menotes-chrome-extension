const DISCOVERY_DOCS = [
  "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
];

export class GApi {
  static instance(...args) {
    if (!GApi._instance) {
      GApi._instance = new GApi(...args);
    }
    return GApi._instance;
  }

  constructor(token) {
    if (!gapi || !gapi.client || !gapi.client.init) {
      throw new Error("gapi.client.init is not defined");
    }

    if (!token) {
      throw new Error("API TOKEN is not passed!");
    }

    this._inited = false;
    this._apiToken = token;
  }

  init() {
    return gapi.client
      .init({
        apiKey: this._apiToken,
        discoveryDocs: DISCOVERY_DOCS,
      })
      .then(() => {
        this._inited = true;
        return Promise.resolve();
      })
      .then(this._getAccessToken)
      .then(this._setAccessToken);
  }

  async getCalendarEvents() {
    if (!this._inited) {
      await this.init();
    }

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
        return response.result.items;
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
}
