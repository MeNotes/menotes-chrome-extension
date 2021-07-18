export class GoogleEvent {
  constructor(event) {
    this.created = event.created;
    this.creator = event.creator;
    this.end = event.end;
    this.start = event.start;
    this.eventType = event.eventType;
    this.htmlLink = event.htmlLink;
    this.summary = event.summary;
    this.organizer = event.organizer;
    this.description = event.description;
  }
}
