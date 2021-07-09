import { createStoreon } from "storeon";
import { storeonLogger } from "storeon/devtools";
import { notes } from "./notes";

export const store = createStoreon([notes, storeonLogger]);
