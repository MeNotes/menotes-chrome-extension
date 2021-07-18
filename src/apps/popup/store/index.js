import { createStoreon } from "storeon";
import { storeonLogger } from "storeon/devtools";
import { notes } from "./notes";

export { UPDATE_ACTIVE_NOTE_ACTION, UPDATE_NOTES_ACTION } from "./notes";

export const store = createStoreon([notes, storeonLogger]);
