import { Note } from "../../../shared/models";

const moduleName = "notes";

export const EMPTY_NOTE = new Note({ id: null, value: "" });

export const GET_NOTES = Symbol(`${moduleName}:GET_NOTES`);
export const GET_NOTES_SUCCESS = Symbol(`${moduleName}:GET_NOTES_SUCCESS`);
export const GET_NOTES_ERROR = Symbol(`${moduleName}:GET_NOTES_ERROR`);

export const UPSERT_NOTE = Symbol(`${moduleName}:UPSERT_NOTE`);
export const UPSERT_NOTE_SUCCESS = Symbol(`${moduleName}:UPSERT_NOTE_SUCCESS`);
export const UPSERT_NOTE_ERROR = Symbol(`${moduleName}:UPSERT_NOTE_ERROR`);

export const REMOVE_NOTE = Symbol(`${moduleName}:REMOVE_NOTE`);
export const REMOVE_NOTE_SUCCESS = Symbol(`${moduleName}:REMOVE_NOTE_SUCCESS`);
export const REMOVE_NOTE_ERROR = Symbol(`${moduleName}:REMOVE_NOTE_ERROR`);

export const GET_ACTIVE_NOTE_ID = Symbol(`${moduleName}:GET_ACTIVE_NOTE_ID`);
export const GET_ACTIVE_NOTE_ID_SUCCESS = Symbol(
  `${moduleName}:GET_ACTIVE_NOTE_ID_SUCCESS`
);
export const GET_ACTIVE_NOTE_ID_ERROR = Symbol(
  `${moduleName}:GET_CALENDAR_EVENTS_ERROR`
);

export const SET_ACTIVE_NOTE_ID = Symbol(`${moduleName}:SET_ACTIVE_NOTE_ID`);
export const SET_ACTIVE_NOTE_ID_SUCCESS = Symbol(
  `${moduleName}:SET_ACTIVE_NOTE_ID_SUCCESS`
);
export const SET_ACTIVE_NOTE_ID_ERROR = Symbol(
  `${moduleName}:SET_ACTIVE_NOTE_ID_ERROR`
);
