import { StoreonModule } from "storeon";
import {
  SET_POPUP_HEIGHT,
  SET_SETTINGS,
  SET_POPUP_WIDTH,
  ENABLE_SIDEBAR,
  DISABLE_SIDEBAR,
  GET_SETTINGS,
  defaultSettings,
} from "./constants";

export interface SettingsState {
  popupHeight: number;
  popupWidth: number;
  showSidebar: boolean;
  loading: boolean;
}

export interface SettingsEvents {
  [SET_SETTINGS]: {
    popupHeight: number;
    popupWidth: number;
    showSidebar: boolean;
  };
  [SET_POPUP_WIDTH]: { popupWidth: number };
  [SET_POPUP_HEIGHT]: { popupHeight: number };

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

  store.on(ENABLE_SIDEBAR, (state) => ({
    ...state,
    showSidebar: true,
  }));

  store.on(DISABLE_SIDEBAR, (state) => ({
    ...state,
    showSidebar: false,
  }));
};
