import React from 'react';
import Navigation from './Navigation/Navigation'

export default function Layout() {
  return (
    <div className="layout_container">
        <div className="layout_navigation">
          <Navigation />
        </div>
        <div className="layout_browser">
          <div>
            <webview
            className="webview"
            src="https://www.notion.so" 
            />
          </div>
        </div>
    </div>
  );
}
