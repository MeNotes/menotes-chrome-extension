interface NoteData {
  id: string | null;
  value: string;
}

export class Note {
  id: string | null;
  value: string;

  constructor(data: NoteData) {
    this.id = data.id;
    this.value = data.value;
  }
}
