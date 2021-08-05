import React from "react";
import "./index.css";

export const App = (): JSX.Element => (
  <main className="content">
    <section className="settings">
      <div className="settings-header">
        <h2 className="settings-header_text">Settings</h2>
        <button id="clear-storage-button" className="clear-storage">
          Clear storage
        </button>
      </div>
      <div className="settings-block settings-general">
        <h3 className="settings-block_header">General</h3>
        <div className="delimiter"></div>
        <div className="setting-items">
          <div className="setting-item">
            <div className="left">
              <h3 className="setting-item_title">
                Enable google calendar synchronization
              </h3>
              <p className="setting-item_description">
                To be able to pre-fill note with agenda from the google
                calendar.
              </p>
            </div>
            <div className="right">
              <button
                id="google-events-toogle"
                className="setting-item_toggle"
              ></button>
            </div>
          </div>
        </div>
      </div>
      <div className="settings-block settings-view">
        <h3 className="settings-block_header">View</h3>
        <div className="delimiter"></div>
        <div className="setting-items">
          <div className="setting-item">
            <div className="left">
              <h3 className="setting-item_title">Width</h3>
              <p className="setting-item_description">
                Setup width for note panel in the px. Min: 300, Max: 760 .
              </p>
            </div>
            <div className="right">
              <div className="group">
                <input id="width-input" type="text" required />
                <span className="highlight"></span>
                <span className="bar"></span>
                <label>px</label>
              </div>
            </div>
          </div>
          <div className="setting-item">
            <div className="left">
              <h3 className="setting-item_title">Height</h3>
              <p className="setting-item_description">
                Setup height for note panel in the px. Min: 300, Max: 540.
              </p>
            </div>
            <div className="right">
              <div className="group">
                <input id="height-input" type="text" required />
                <span className="highlight"></span>
                <span className="bar"></span>
                <label>px</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
);
