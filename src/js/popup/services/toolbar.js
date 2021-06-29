import { EDITOR_TOOLBAR_STATUS_KEY } from "../../shared/constants";

export class ToolbarService {
  constructor(storageService) {
    this.storageService = storageService;
  }

  getVisibility() {
    return this.storageService.get(EDITOR_TOOLBAR_STATUS_KEY);
  }

  setVisibility(value) {
    return this.storageService.set(EDITOR_TOOLBAR_STATUS_KEY, value);
  }
}
