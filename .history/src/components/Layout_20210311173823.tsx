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
            {/* <webview
            style={{height: '100vh', width: '100%'}}
            src="https://mail.google.com/mail/u/0/#inbox" 
            /> */}
            <iframe src="www.google.com" title="cheese" sandbox='' style={{height: '100vh', width: '100%'}}/>
          </div>
        </div>
    </div>
  );
}
