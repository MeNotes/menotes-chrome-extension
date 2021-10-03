import { useCallback, useEffect, useMemo } from "react";
import { useStoreon } from "storeon/react";
import { USER_SETTINGS_KEY } from "../../../shared/constants";
import { StorageService } from "../../../shared/services";
import { UserSettings } from "../../../shared/types";
import {
  defaultSettings,
  DISABLE_SIDEBAR,
  ENABLE_SIDEBAR,
  GET_SETTINGS,
  SET_SETTINGS,
} from "./constants";
import { SettingsEvents, SettingsState } from "./reducer";

const storage = new StorageService();

export function useSettingsQuery() {
  const { dispatch, popupWidth, popupHeight, showSidebar, loading } =
    useStoreon<SettingsState, SettingsEvents>(
      "showSidebar",
      "popupWidth",
      "popupHeight",
      "loading"
    );

  useEffect(() => {
    dispatch(GET_SETTINGS);
    storage
      .get(USER_SETTINGS_KEY)
      .then((settings: UserSettings) => {
        if (settings) {
          dispatch(SET_SETTINGS, settings);
          return;
        }
        dispatch(SET_SETTINGS, defaultSettings);
      })
      .catch(() => dispatch(SET_SETTINGS, defaultSettings));
  }, [dispatch]);

  return { popupWidth, popupHeight, showSidebar, loading };
}

export function useSettingsMutation() {
  const { dispatch, popupWidth, popupHeight, showSidebar } = useStoreon<
    SettingsState,
    SettingsEvents
  >("showSidebar", "popupWidth", "popupHeight");

  const settings = useMemo(
    () => ({
      popupWidth,
      popupHeight,
      showSidebar,
    }),
    [popupWidth, popupHeight, showSidebar]
  );

  const setSettings = useCallback(
    (settings: { popupHeight: number; popupWidth: number }) => {
      const newSettings = { ...settings, showSidebar };
      storage.set(USER_SETTINGS_KEY, newSettings).then(() => {
        dispatch(SET_SETTINGS, newSettings);
      });
    },
    [dispatch, showSidebar]
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

  const clearSettings = useCallback(() => {
    storage.clear().then(() => {
      dispatch(SET_SETTINGS, defaultSettings);
    });
  }, [dispatch]);

  return {
    enableSidebar,
    setSettings,
    disableSidebar,
    clearSettings,
  };
}
