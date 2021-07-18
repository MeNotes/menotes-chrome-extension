import {
  MAX_HEIGHT,
  MAX_WIDTH,
  MIN_HEIGHT,
  MIN_WIDTH,
  USER_OPTIONS_KEY,
} from "../../../shared/constants";
import { UserSettings } from "../../../shared/models";

export class OptionsPages {
  constructor(storage) {
    this.storageService = storage;

    this.__init();
  }

  __init() {
    this.__defineControls();
    this.__presetSetting();
    this.__defineListeners();
  }

  __presetSetting() {
    this.storageService.get(USER_OPTIONS_KEY).then((settings) => {
      this.userSettings = new UserSettings(settings);

      this.googleEventsButton.className += this.userSettings.googleSync
        ? " on"
        : " off";

      this.widthInput.value = this.userSettings.popupWidth;
      this.heightInput.value = this.userSettings.popupHeight;
    });
  }

  __defineControls() {
    this.googleEventsButton = document.getElementById("google-events-toogle");
    this.widthInput = document.getElementById("width-input");
    this.heightInput = document.getElementById("height-input");
    this.clearStorageButton = document.getElementById("clear-storage-button");
  }

  __defineListeners() {
    this.clearStorageButton.addEventListener("click", () => {
      this.storageService.clear();
    });

    this.googleEventsButton.addEventListener("click", () => {
      const current = this.userSettings.googleSync;
      this.userSettings.googleSync = !current;

      this.storageService.set(USER_OPTIONS_KEY, this.userSettings).then(() => {
        this.__toggleGooglSync();
      });
    });

    this.widthInput.addEventListener("blur", (event) => {
      const width = event.target.value;
      if (!this.__isWidthValid(width)) {
        return;
      }
      this.userSettings.popupWidth = event.target.value;
      this.storageService.set(USER_OPTIONS_KEY, this.userSettings);
    });

    this.heightInput.addEventListener("blur", (event) => {
      const height = event.target.value;
      if (!this.__isHeightValid(height)) {
        return;
      }
      this.userSettings.popupHeight = event.target.value;
      this.storageService.set(USER_OPTIONS_KEY, this.userSettings);
    });
  }

  __toggleGooglSync() {
    const className = this.googleEventsButton.className;
    if (className.includes("off")) {
      this.googleEventsButton.classList.remove("off");
      this.googleEventsButton.className += " on";
      return;
    }

    this.googleEventsButton.classList.remove("on");
    this.googleEventsButton.className += " off";
  }

  __isWidthValid(width) {
    return +MAX_WIDTH >= +width && +MIN_WIDTH <= +width;
  }

  __isHeightValid(height) {
    return +MAX_HEIGHT >= +height && +MIN_HEIGHT <= +height;
  }
}
