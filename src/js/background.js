import "../img/icon-128.png";
import "../img/icon-34.png";
import { App } from "./background/App";
import { GApi } from "./shared/services";

window.onload = function () {
  const gApiService = GApi.instance();
  new App(gApiService);
};
