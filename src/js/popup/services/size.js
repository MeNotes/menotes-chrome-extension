import {
  USER_OPTIONS_KEY,
  MIN_WIDTH,
  MAX_WIDTH,
  MAX_HEIGHT,
  MIN_HEIGHT,
} from "../../shared/constants";
import { UserSettings } from "../../shared/models";

const CONTAINER_ID = "app";

export class SizeService {
  constructor(storageService) {
    this.storageService = storageService;
    this.container = document.getElementById(CONTAINER_ID);

    if (!this.container) {
      throw new Error("Container is not found!");
    }

    this.__resize();
  }

  __resize() {
    this.storageService.get(USER_OPTIONS_KEY).then((settings) => {
      const userSettings = new UserSettings(settings);
      this.__setEdgeSize();
      this.__setSize({
        width: userSettings.popupWidth,
        height: userSettings.popupHeight,
      });
    });
  }

  __setEdgeSize() {
    this.container.style.maxWidth = `${MAX_WIDTH}px`;
    this.container.style.maxHeight = `${MAX_HEIGHT}px`;
    this.container.style.minHeight = `${MIN_HEIGHT}px`;
    this.container.style.minWidth = `${MIN_WIDTH}px`;
  }

  __setSize({ width, height }) {
    this.container.style.width = width;
    this.container.style.height = height;
  }
}
