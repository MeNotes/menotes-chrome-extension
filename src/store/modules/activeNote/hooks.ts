import { useEffect } from "react";
import { useStoreon } from "storeon/react";
import { NotesService } from "../../../apps/popup/services";
import { GoogleEvent, Note } from "../../../shared/models";
import { StorageService } from "../../../shared/services";
import {
  GET_ACTIVE_NOTE,
  GET_ACTIVE_NOTE_ERROR,
  GET_ACTIVE_NOTE_SUCCESS,
} from "./constants";
import { ActiveNoteEvents, ActiveNoteState } from "./reducer";

export function useFetchActiveNote(): void {
  const { dispatch } = useStoreon<ActiveNoteState, ActiveNoteEvents>(
    "activeNote"
  );

  useEffect(() => {
    const storage = new StorageService();
    const notesService = new NotesService(storage);

    dispatch(GET_ACTIVE_NOTE);

    notesService
      .getActiveNote()
      .then((activeNote: Note[]) => {
        dispatch(GET_ACTIVE_NOTE_SUCCESS, { activeNote });
      })
      .catch((error: unknown) => {
        dispatch(GET_ACTIVE_NOTE_ERROR, { error });
      });
  }, [dispatch]);
}
