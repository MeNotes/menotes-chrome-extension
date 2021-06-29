import "../css/options.css";
import { App } from "./options/App";
import { StorageService } from "../js/shared/services/storage";

const storageService = new StorageService();

new App(storageService);
