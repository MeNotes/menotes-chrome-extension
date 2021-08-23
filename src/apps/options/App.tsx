import React from "react";
import { useSettingsQuery } from "../../store/modules";
import { OptionsPage } from "./pages";

export const App = (): JSX.Element | null => {
  const { loading } = useSettingsQuery();

  return !loading ? <OptionsPage /> : null;
};
