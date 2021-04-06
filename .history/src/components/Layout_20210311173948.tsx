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
            <div dangerouslySetInnerHTML={{ __html: "<iframe src='https://www.youtube.com/embed/cWDJoK8zw58' />"}} />
          </div>
        </div>
    </div>
  );
}
