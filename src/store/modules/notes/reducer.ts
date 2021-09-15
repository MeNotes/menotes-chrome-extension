import { StoreonModule } from "storeon";
import { Note } from "../../../shared/models";
import {
  GET_ACTIVE_NOTE_ID,
  GET_ACTIVE_NOTE_ID_ERROR,
  GET_ACTIVE_NOTE_ID_SUCCESS,
  SET_ACTIVE_NOTE_ID,
  SET_ACTIVE_NOTE_ID_ERROR,
  SET_ACTIVE_NOTE_ID_SUCCESS,
  GET_NOTES,
  GET_NOTES_ERROR,
  GET_NOTES_SUCCESS,
  UPSERT_NOTE,
  UPSERT_NOTE_ERROR,
  UPSERT_NOTE_SUCCESS,
  REMOVE_NOTE,
  REMOVE_NOTE_ERROR,
  REMOVE_NOTE_SUCCESS,
} from "./constants";

export interface NotesState {
  activeNoteId: string | null;
  notes: Note[];
  notesError: unknown;
  notesLoading: boolean;
}

export interface NotesEvents {
  [GET_ACTIVE_NOTE_ID]: undefined;
  [GET_ACTIVE_NOTE_ID_ERROR]: { notesError: unknown };
  [GET_ACTIVE_NOTE_ID_SUCCESS]: { activeNoteId: string | null };

  [SET_ACTIVE_NOTE_ID]: undefined;
  [SET_ACTIVE_NOTE_ID_ERROR]: { notesError: unknown };
  [SET_ACTIVE_NOTE_ID_SUCCESS]: { activeNoteId: string | null };

  [GET_NOTES]: undefined;
  [GET_NOTES_ERROR]: { notesError: unknown };
  [GET_NOTES_SUCCESS]: { notes: Note[] };

  [UPSERT_NOTE]: undefined;
  [UPSERT_NOTE_ERROR]: { notesError: unknown };
  [UPSERT_NOTE_SUCCESS]: { note: Note };

  [REMOVE_NOTE]: undefined;
  [REMOVE_NOTE_ERROR]: { notesError: unknown };
  [REMOVE_NOTE_SUCCESS]: { note: Note };
}

export const notesModule: StoreonModule<NotesState, NotesEvents> = (store) => {
  store.on("@init", () => ({
    activeNoteId: null,
    notes: [],
    notesLoading: false,
    notesError: undefined,
  }));

  store.on(GET_ACTIVE_NOTE_ID, (state) => ({
    ...state,
    notesLoading: true,
    notesError: undefined,
  }));
  store.on(GET_ACTIVE_NOTE_ID_SUCCESS, (state, payload) => ({
    ...state,
    activeNoteId: payload.activeNoteId,
    notesLoading: false,
    notesError: undefined,
  }));
  store.on(GET_ACTIVE_NOTE_ID_ERROR, (state, payload) => ({
    ...state,
    notesLoading: false,
    notesError: payload.notesError,
  }));

  store.on(SET_ACTIVE_NOTE_ID, (state) => ({
    ...state,
    notesLoading: true,
    notesError: undefined,
  }));
  store.on(SET_ACTIVE_NOTE_ID_SUCCESS, (state, payload) => ({
    ...state,
    activeNoteId: payload.activeNoteId,
    notesLoading: false,
    notesError: undefined,
  }));
  store.on(SET_ACTIVE_NOTE_ID_ERROR, (state, payload) => ({
    ...state,
    notesLoading: false,
    notesError: payload.notesError,
  }));

  store.on(GET_NOTES, (state) => ({
    ...state,
    notesLoading: true,
    notesError: undefined,
  }));
  store.on(GET_NOTES_SUCCESS, (state, payload) => ({
    ...state,
    notes: payload.notes ?? [],
    notesLoading: false,
    notesError: undefined,
  }));
  store.on(GET_NOTES_ERROR, (state, payload) => ({
    ...state,
    notesLoading: false,
    notesError: payload.notesError,
  }));

  store.on(UPSERT_NOTE, (state) => ({
    ...state,
    notesLoading: true,
    notesError: undefined,
  }));
  store.on(UPSERT_NOTE_SUCCESS, (state, payload) => ({
    ...state,
    notes: [
      payload.note,
      ...state.notes.filter((n) => n.id !== payload.note.id),
    ],
    notesLoading: false,
    notesError: undefined,
  }));
  store.on(UPSERT_NOTE_ERROR, (state, payload) => ({
    ...state,
    notesLoading: false,
    notesError: payload.notesError,
  }));

  store.on(REMOVE_NOTE, (state) => ({
    ...state,
    notesLoading: true,
    notesError: undefined,
  }));
  store.on(REMOVE_NOTE_SUCCESS, (state, payload) => ({
    ...state,
    notes: state.notes.filter((n) => n.id !== payload.note.id),
    notesLoading: false,
    notesError: undefined,
  }));
  store.on(REMOVE_NOTE_ERROR, (state, payload) => ({
    ...state,
    notesLoading: false,
    notesError: payload.notesError,
  }));
};
