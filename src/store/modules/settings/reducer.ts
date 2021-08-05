import { StoreonModule } from "storeon";
import { Note } from "../../../shared/models";
import {
  SET_POPUP_HEIGHT,
  SET_SETTINGS,
  SET_POPUP_WIDTH,
  ENABLE_GOOGLE_SYNC,
  ENABLE_SIDEBAR,
  DISABLE_GOOGLE_SYNC,
  DISABLE_SIDEBAR,
} from "./constants";

export interface SettingsState {
  popupHeight: string;
  popupWidth: string;
  showSidebar: boolean;
  googleSync: boolean;
}

export interface SettingsEvents {
  [SET_SETTINGS]: SettingsState;
  [SET_POPUP_WIDTH]: { popupWidth: string };
  [SET_POPUP_HEIGHT]: { popupHeight: string };

  [ENABLE_GOOGLE_SYNC]: undefined;
  [DISABLE_GOOGLE_SYNC]: undefined;
  [ENABLE_SIDEBAR]: undefined;
  [DISABLE_SIDEBAR]: undefined;
}

export const settingsModule: StoreonModule<SettingsState, SettingsEvents> = (
  store
) => {
  store.on("@init", () => ({
    popupHeight: "390px",
    popupWidth: "600px",
    showSidebar: true,
    googleSync: true,
  }));

  store.on(SET_SETTINGS, (state, payload) => ({
    ...state,
    popupHeight: payload.popupHeight,
    popupWidth: payload.popupWidth,
    googleSync: payload.googleSync,
    showSidebar: payload.showSidebar,
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
