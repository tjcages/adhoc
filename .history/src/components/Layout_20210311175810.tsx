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
            {/* <webview
            style={{height: '100vh', width: '100%'}}
            src="https://mail.google.com/mail/u/0/#inbox" 
            /> */}
            <div dangerouslySetInnerHTML={{ __html: "<iframe src='https://mail.superhuman.com/tylerjcagle@gmail.com/inbox/news' style='height: 100%; width: 100%;' />"}} style={{height: '100%'}} />
          </div>
        </div>
    </div>
  );
}
