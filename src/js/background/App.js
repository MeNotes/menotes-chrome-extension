import { GApi } from "../shared/services";
import secrets from "secrets";

export class App {
  constructor() {
    this._gapi = GApi.instance(secrets.API_GOOGLE_KEY);
  }

  syncEvents() {
    this._gapi.getCalendarEvents().then((events) => {
      console.log(events);
    });
  }
}
