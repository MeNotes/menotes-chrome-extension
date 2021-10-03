import React, { useCallback, useEffect } from "react";
import { useStoreon } from "storeon/react";
import {
  MAX_HEIGHT,
  MAX_WIDTH,
  MIN_HEIGHT,
  MIN_WIDTH,
} from "../../../shared/constants";
import { SettingsEvents, SettingsState } from "../../../store/modules";

const setEdgeSize = (el: HTMLElement) => {
  if (!el) return;
  el.style.maxWidth = `${MAX_WIDTH}px`;
  el.style.maxHeight = `${MAX_HEIGHT}px`;
  el.style.minHeight = `${MIN_HEIGHT}px`;
  el.style.minWidth = `${MIN_WIDTH}px`;
};

const setSize = ({
  width,
  height,
  el,
}: {
  el: HTMLElement;
  width: number;
  height: number;
}) => {
  el.style.width = `${width}px`;
  el.style.height = `${height}px`;
};

export const useSize = (containerRef: HTMLElement | null) => {
  const { popupWidth, popupHeight } = useStoreon<SettingsState, SettingsEvents>(
    "popupWidth",
    "popupHeight",
    "loading"
  );

  useEffect(() => {
    if (!containerRef) return;

    setSize({
      el: containerRef,
      width: popupWidth,
      height: popupHeight,
    });

    setEdgeSize(containerRef);
  }, [popupWidth, popupHeight, containerRef]);
};
