const moduleName = "settings";

export const GET_SETTINGS = Symbol(`${moduleName}:GET_SETTINGS`);
export const SET_SETTINGS = Symbol(`${moduleName}:SET_SETTINGS`);
export const SET_POPUP_HEIGHT = Symbol(`${moduleName}:SET_POPUP_HEIGHT`);
export const SET_POPUP_WIDTH = Symbol(`${moduleName}:SET_POPUP_WIDTH`);
export const ENABLE_SIDEBAR = Symbol(`${moduleName}:ENABLE_SIDEBAR`);
export const DISABLE_SIDEBAR = Symbol(`${moduleName}:DISABLE_SIDEBAR`);
export const ENABLE_GOOGLE_SYNC = Symbol(`${moduleName}:ENABLE_GOOGLE_SYNC`);
export const DISABLE_GOOGLE_SYNC = Symbol(`${moduleName}:DISABLE_GOOGLE_SYNC`);

export const defaultSettings = {
  popupHeight: 390,
  popupWidth: 600,
  showSidebar: true,
  googleSync: true,
  loading: false,
};
