import { useCallback, useEffect, useMemo } from "react";
import { useStoreon } from "storeon/react";
import { NotesService } from "../../../apps/popup/services";
import { USER_SETTINGS_KEY } from "../../../shared/constants";
import { Note } from "../../../shared/models";
import { StorageService } from "../../../shared/services";
import { UserSettings } from "../../../shared/types";
import {
  DISABLE_GOOGLE_SYNC,
  DISABLE_SIDEBAR,
  ENABLE_SIDEBAR,
  SET_POPUP_HEIGHT,
  SET_POPUP_WIDTH,
  SET_SETTINGS,
} from "./constants";
import { SettingsEvents, SettingsState } from "./reducer";

const storage = new StorageService();
const notesService = new NotesService(storage);

export function useSettingsQuery() {
  const { dispatch, popupWidth, popupHeight, showSidebar, googleSync } =
    useStoreon<SettingsState, SettingsEvents>(
      "googleSync",
      "showSidebar",
      "popupWidth",
      "popupHeight"
    );

  useEffect(() => {
    storage.get(USER_SETTINGS_KEY).then((settings: UserSettings) => {
      dispatch(SET_SETTINGS, settings);
    });
  }, [dispatch]);

  return { popupWidth, popupHeight, showSidebar, googleSync };
}

export function useSettingsMutation() {
  const { dispatch, popupWidth, popupHeight, showSidebar, googleSync } =
    useStoreon<SettingsState, SettingsEvents>(
      "googleSync",
      "showSidebar",
      "popupWidth",
      "popupHeight"
    );

  const settings = useMemo(
    () => ({
      popupWidth,
      popupHeight,
      showSidebar,
      googleSync,
    }),
    [popupWidth, popupHeight, showSidebar, googleSync]
  );

  const setPopupHeight = useCallback(
    (height: string) => {
      storage
        .set(USER_SETTINGS_KEY, {
          ...settings,
          popupHeight: height,
        })
        .then(() => {
          dispatch(SET_POPUP_HEIGHT, { popupHeight: height });
        });
    },
    [dispatch, settings]
  );

  const setPopupWidth = useCallback(
    (width: string) => {
      storage
        .set(USER_SETTINGS_KEY, {
          ...settings,
          popupWidth: width,
        })
        .then(() => {
          dispatch(SET_POPUP_WIDTH, { popupWidth: width });
        });
    },
    [dispatch]
  );

  const disableSidebar = useCallback(() => {
    storage
      .set(USER_SETTINGS_KEY, {
        ...settings,
        showSidebar: false,
      })
      .then(() => {
        dispatch(DISABLE_SIDEBAR);
      });
  }, [dispatch]);

  const enableSidebar = useCallback(() => {
    storage
      .set(USER_SETTINGS_KEY, {
        ...settings,
        showSidebar: true,
      })
      .then(() => {
        dispatch(ENABLE_SIDEBAR);
      });
  }, [dispatch]);

  const enableGoogleSync = useCallback(() => {
    storage
      .set(USER_SETTINGS_KEY, {
        ...settings,
        googleSync: true,
      })
      .then(() => {
        dispatch(ENABLE_SIDEBAR);
      });
  }, [dispatch]);

  const disableGoogleSync = useCallback(() => {
    storage
      .set(USER_SETTINGS_KEY, {
        ...settings,
        googleSync: false,
      })
      .then(() => {
        dispatch(DISABLE_GOOGLE_SYNC);
      });
  }, [dispatch]);

  return {
    setPopupWidth,
    disableGoogleSync,
    enableGoogleSync,
    enableSidebar,
    setPopupHeight,
    disableSidebar,
  };
}
