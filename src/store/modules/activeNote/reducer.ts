import { StoreonModule } from "storeon";
import { Note } from "../../../shared/models";
import {
  GET_ACTIVE_NOTE,
  GET_ACTIVE_NOTE_ERROR,
  GET_ACTIVE_NOTE_SUCCESS,
} from "./constants";

export interface ActiveNoteState {
  activeNote: Note;
  error: unknown;
  loading: boolean;
}

export interface ActiveNoteEvents {
  [GET_ACTIVE_NOTE]: undefined;
  [GET_ACTIVE_NOTE_SUCCESS]: { activeNote: Note };
  [GET_ACTIVE_NOTE_ERROR]: { error: unknown };
}

export const ActiveNoteModule: StoreonModule<
  ActiveNoteState,
  ActiveNoteEvents
> = (store) => {
  store.on("@init", () => ({ events: [], loading: false, error: undefined }));
  store.on(GET_ACTIVE_NOTE, () => ({
    events: [],
    loading: true,
    error: undefined,
  }));
  store.on(GET_ACTIVE_NOTE_SUCCESS, (state, payload) => ({
    events: payload.activeNote,
    loading: false,
    error: undefined,
  }));
  store.on(GET_ACTIVE_NOTE_ERROR, (payload) => ({
    events: [],
    loading: false,
    error: payload.error,
  }));
};
