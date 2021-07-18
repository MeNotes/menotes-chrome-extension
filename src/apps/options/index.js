import "./index.css";
import { App } from "./App";
import { StorageService } from "../../shared/services";

const storageService = new StorageService();

new App(storageService);
