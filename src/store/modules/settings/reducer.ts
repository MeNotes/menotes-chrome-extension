import { StoreonModule } from "storeon";
import {
  SET_POPUP_HEIGHT,
  SET_SETTINGS,
  SET_POPUP_WIDTH,
  ENABLE_GOOGLE_SYNC,
  ENABLE_SIDEBAR,
  DISABLE_GOOGLE_SYNC,
  DISABLE_SIDEBAR,
  GET_SETTINGS,
  defaultSettings,
} from "./constants";

export interface SettingsState {
  popupHeight: number;
  popupWidth: number;
  showSidebar: boolean;
  googleSync: boolean;
  loading: boolean;
}

export interface SettingsEvents {
  [SET_SETTINGS]: {
    popupHeight: number;
    popupWidth: number;
    showSidebar: boolean;
    googleSync: boolean;
  };
  [SET_POPUP_WIDTH]: { popupWidth: number };
  [SET_POPUP_HEIGHT]: { popupHeight: number };

  [ENABLE_GOOGLE_SYNC]: undefined;
  [DISABLE_GOOGLE_SYNC]: undefined;
  [ENABLE_SIDEBAR]: undefined;
  [DISABLE_SIDEBAR]: undefined;
  [GET_SETTINGS]: undefined;
}

export const settingsModule: StoreonModule<SettingsState, SettingsEvents> = (
  store
) => {
  store.on("@init", () => defaultSettings);

  store.on(GET_SETTINGS, (state) => ({
    ...state,
    loading: true,
  }));

  store.on(SET_SETTINGS, (state, payload) => ({
    ...state,
    popupHeight: payload.popupHeight,
    popupWidth: payload.popupWidth,
    googleSync: payload.googleSync,
    showSidebar: payload.showSidebar,
    loading: false,
  }));

  store.on(SET_POPUP_WIDTH, (state, payload) => ({
    ...state,
    popupWidth: payload.popupWidth,
  }));

  store.on(SET_POPUP_HEIGHT, (state, payload) => ({
    ...state,
    popupHeight: payload.popupHeight,
  }));

  store.on(ENABLE_GOOGLE_SYNC, (state) => ({
    ...state,
    googleSync: true,
  }));

  store.on(DISABLE_GOOGLE_SYNC, (state) => ({
    ...state,
    googleSync: false,
  }));

  store.on(ENABLE_SIDEBAR, (state) => ({
    ...state,
    showSidebar: true,
  }));

  store.on(DISABLE_SIDEBAR, (state) => ({
    ...state,
    showSidebar: false,
  }));
};
