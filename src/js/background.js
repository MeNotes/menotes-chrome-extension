import "../img/icon-128.png";
import "../img/icon-34.png";
import { App } from "./background/App";

window.onload = function () {
  new App().syncEvents();
};
