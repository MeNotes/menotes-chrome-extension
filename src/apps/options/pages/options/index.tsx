import React, { useCallback, useEffect, useState } from "react";
import {
  SettingsEvents,
  SettingsState,
  useSettingsMutation,
} from "../../../../store/modules";
import {
  MAX_HEIGHT,
  MAX_WIDTH,
  MIN_HEIGHT,
  MIN_WIDTH,
} from "../../../../shared/constants";
import { useStoreon } from "storeon/react";
import styles from "./styles.module.css";

const isWidthValid = (width: string): boolean => {
  return +MAX_WIDTH >= +width && +MIN_WIDTH <= +width;
};
const isHeightValid = (height: string): boolean => {
  return +MAX_HEIGHT >= +height && +MIN_HEIGHT <= +height;
};

export const OptionsPage = () => {
  const { popupWidth, popupHeight } = useStoreon<SettingsState, SettingsEvents>(
    "popupWidth",
    "popupHeight",
    "loading"
  );
  const { setSettings, clearSettings } = useSettingsMutation();

  const [localWidth, setLocalWidth] = useState<string>("");
  const [localHeight, setLocalHeight] = useState<string>("");

  useEffect(() => {
    setLocalWidth(popupWidth.toString());
    setLocalHeight(popupHeight.toString());
  }, [popupWidth, popupHeight]);

  const onSave = useCallback(() => {
    const newHeight = isHeightValid(localHeight) ? localHeight : popupHeight;
    const newWidth = isWidthValid(localWidth) ? localWidth : popupWidth;

    setSettings({
      popupHeight: +newHeight,
      popupWidth: +newWidth,
    });
  }, [localWidth, localHeight, popupWidth, popupHeight]);

  return (
    <main className={styles.content}>
      <section className={styles.settings}>
        <div className={styles["settings-header"]}>
          <h2 className={styles["settings-header_text"]}>Settings</h2>
          <button className={styles["clear-storage"]} onClick={clearSettings}>
            Clear storage
          </button>
        </div>
        <div className={styles["settings-block settings-view"]}>
          <h3 className={styles["settings-block_header"]}>View</h3>
          <div className={styles["delimiter"]}></div>
          <div className={styles["setting-items"]}>
            <div className={styles["setting-item"]}>
              <div className={styles.left}>
                <h3 className={styles["setting-item_title"]}>Width</h3>
                <p className={styles["setting-item_description"]}>
                  Setup width for note panel in the px. Min: 300, Max: 760 .
                </p>
              </div>
              <div className={styles["right"]}>
                <div className={styles.group}>
                  <input
                    type="text"
                    value={localWidth}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setLocalWidth(e.target.value)
                    }
                    required
                  />
                  <span className={styles.highlight}></span>
                  <span className={styles.bar}></span>
                  <label>px</label>
                </div>
              </div>
            </div>
            <div className={styles["setting-item"]}>
              <div className={styles.left}>
                <h3 className={styles["setting-item_title"]}>Height</h3>
                <p className={styles["setting-item_description"]}>
                  Setup height for note panel in the px. Min: 300, Max: 540.
                </p>
              </div>
              <div className={styles.right}>
                <div className={styles.group}>
                  <input
                    type="text"
                    value={localHeight}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setLocalHeight(e.target.value)
                    }
                    required
                  />
                  <span className={styles.highlight}></span>
                  <span className={styles.bar}></span>
                  <label>px</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button className={styles.save} onClick={onSave}>
          Save
        </button>
      </section>
    </main>
  );
};
