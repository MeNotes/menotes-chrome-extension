import React from "react";
import { CalendarEventList } from "./components/CalendarEventList";
import "./styles.css";

export const App = (): JSX.Element => (
  <main className="popup-container">
    <div id="editor-page" className="editor-page">
      <div className="editor-page__header">
        <CalendarEventList />
        <div className="editor-page__actions">
          <button
            id="clear-note-button"
            className="editor-page__create-button editor__toolbar-button"
            title="Create new note"
          >
            <i className="fa fa-edit"></i>
          </button>
          <button
            id="toggle-sidebar-button"
            className="editor-page__sidebar-button editor__toolbar-button"
            title="Toggle"
          >
            <i className="fa fa-columns"></i>
          </button>
          <button
            id="settings-button"
            className="editor-page__settings-button editor__toolbar-button"
            title="Toggle"
          >
            <i className="fa fa-cog"></i>
          </button>
        </div>
      </div>

      <div className="editor-page__container">
        <div className="editor-page__editor editor">
          <button
            id="toggle-toolbar-button"
            className="editor__toolbar-toggle fa editor__toolbar-button"
            title="Toggle toolbar"
          ></button>
          <button
            id="copy-note-button"
            className="editor__toolbar-copy editor__toolbar-button"
            title="Copy to clipboard"
          >
            <i className="fa fa-clipboard"></i>
          </button>
          <textarea id="editor"></textarea>
        </div>

        <div id="sidebar" className="editor-page__sidebar hidden">
          <div id="notes-js" className="note-list"></div>
        </div>
      </div>
    </div>
  </main>
);
