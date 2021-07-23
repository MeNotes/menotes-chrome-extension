import {
  EDITOR_TOOLBAR_STATUS_KEY,
  SIDEBAR_STATUS_KEY,
} from "../../../shared/constants";

export class UIStateService {
  constructor(storageService) {
    this.storageService = storageService;
  }

  getToolbarVisibility() {
    return this.storageService.get(EDITOR_TOOLBAR_STATUS_KEY);
  }

  setToolbarVisibility(value) {
    return this.storageService.set(EDITOR_TOOLBAR_STATUS_KEY, value);
  }

  getSidebarVisibility() {
    return this.storageService.get(SIDEBAR_STATUS_KEY);
  }

  setSidebarVisibility(value) {
    return this.storageService.set(SIDEBAR_STATUS_KEY, value);
  }
}
