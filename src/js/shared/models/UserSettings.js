export const DEFAULT_USER_SETTINGS = {
  googleSync: true,
  popupHeight: "390px",
  popupWidth: "600px",
};

export class UserSettings {
  constructor(params = {}) {
    const { googleSync, popupHeight, popupWidth } = {
      ...DEFAULT_USER_SETTINGS,
      ...params,
    };
    this.googleSync = googleSync;
    this.popupWidth = popupWidth;
    this.popupHeight = popupHeight;
  }
}
