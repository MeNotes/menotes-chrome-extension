import { SettingService } from "./services";

export class App {
  constructor(storageService) {
    this.storageService = storageService;
    this.settingService = new SettingService(storageService);
  }
}
