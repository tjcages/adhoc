import React from 'react';
import Navigation from './Navigation/Navigation'

export default function Layout() {
  return (
    <div className="layout_container">
        <div className="layout_navigation">
          <Navigation />
        </div>
        <div className="layout_browser">
          <div style={{height: '100vh', width: '100%'}}>
            <webview
            className="webview"
            src="https://www.notion.so" 
            />
          </div>
        </div>
    </div>
  );
}
