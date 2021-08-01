import { useCallback, useEffect } from "react";
import { useStoreon } from "storeon/react";
import { NotesService } from "../../../apps/popup/services";
import { Note } from "../../../shared/models";
import { StorageService } from "../../../shared/services";
import {
  EMPTY_NOTE,
  UPSERT_NOTE,
  UPSERT_NOTE_ERROR,
  UPSERT_NOTE_SUCCESS,
  GET_ACTIVE_NOTE_ID,
  GET_ACTIVE_NOTE_ID_ERROR,
  GET_ACTIVE_NOTE_ID_SUCCESS,
  GET_NOTES,
  GET_NOTES_ERROR,
  GET_NOTES_SUCCESS,
  REMOVE_NOTE,
  REMOVE_NOTE_ERROR,
  REMOVE_NOTE_SUCCESS,
  SET_ACTIVE_NOTE_ID,
  SET_ACTIVE_NOTE_ID_ERROR,
  SET_ACTIVE_NOTE_ID_SUCCESS,
} from "./constants";
import { NotesEvents, NotesState } from "./reducer";

const storage = new StorageService();
const notesService = new NotesService(storage);

export function useNotesQuery() {
  const { dispatch, notes, activeNoteId } = useStoreon<NotesState, NotesEvents>(
    "activeNoteId",
    "notes"
  );

  useEffect(() => {
    dispatch(GET_NOTES);
    dispatch(GET_ACTIVE_NOTE_ID);

    notesService
      .getNotes()
      .then((notes: Note[]) => {
        dispatch(GET_NOTES_SUCCESS, { notes });
        return notesService.getActiveNoteId();
      })
      .catch((notesError: unknown) => {
        dispatch(GET_NOTES_ERROR, { notesError });
      })
      .then((activeNoteId: string) => {
        if (!activeNoteId) throw new Error("id is undefined");
        dispatch(GET_ACTIVE_NOTE_ID_SUCCESS, { activeNoteId });
      })
      .catch((notesError: unknown) => {
        dispatch(GET_ACTIVE_NOTE_ID_ERROR, { notesError });
      });
  }, [dispatch]);

  return { notes, activeNoteId };
}

export function useNotesMutation() {
  const { dispatch } = useStoreon<NotesState, NotesEvents>("notes");

  const upsertNote = (note: Note) => {
    dispatch(UPSERT_NOTE);

    return notesService
      .upsertNote(note)
      .then((note: Note) => {
        dispatch(UPSERT_NOTE_SUCCESS, { note });
      })
      .catch((notesError: unknown) => {
        dispatch(UPSERT_NOTE_ERROR, { notesError });
      });
  };

  const upsertActiveNote = (note: Note) => {
    return upsertNote(note).then(() => {
      clearActiveNoteId();
    });
  };

  const removeNote = (note: Note) => {
    dispatch(REMOVE_NOTE);

    return notesService
      .removeNote(note.id)
      .then(() => {
        dispatch(REMOVE_NOTE_SUCCESS, { note });
      })
      .catch((notesError: unknown) => {
        dispatch(REMOVE_NOTE_ERROR, { notesError });
      });
  };

  const setActiveNoteId = (activeNoteId: string | null) => {
    dispatch(SET_ACTIVE_NOTE_ID);

    return notesService
      .setActiveNoteId(activeNoteId)
      .then(() => {
        dispatch(SET_ACTIVE_NOTE_ID_SUCCESS, { activeNoteId });
      })
      .catch((notesError: unknown) => {
        dispatch(SET_ACTIVE_NOTE_ID_ERROR, { notesError });
      });
  };

  const clearActiveNoteId = () => {
    dispatch(SET_ACTIVE_NOTE_ID);

    return notesService
      .removeActiveNoteId()
      .then(() => {
        dispatch(SET_ACTIVE_NOTE_ID_SUCCESS, { activeNoteId: null });
      })
      .catch((notesError: unknown) => {
        dispatch(SET_ACTIVE_NOTE_ID_ERROR, { notesError });
      });
  };

  return {
    upsertNote: useCallback(upsertNote, []),
    upsertActiveNote: useCallback(upsertActiveNote, []),
    removeNote: useCallback(removeNote, []),
    setActiveNoteId: useCallback(setActiveNoteId, []),
    clearActiveNoteId: useCallback(clearActiveNoteId, []),
  };
}
