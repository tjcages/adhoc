import React from 'react';
import Navigation from './Navigation/Navigation'

import { getLinkPreview, getPreviewFromContent } from 'link-preview-js';

export default function Layout() {
  function getLink() {
    getLinkPreview('https://www.notion.so')
      .then((data) => console.debug(data));
  }

  return (
    <div className="layout_container">
        <div className="layout_navigation">
          <Navigation />
        </div>
        <div className="layout_browser" onClick={getLink}>
          <div style={{height: '100vh', width: '100%'}}>
            Hi durka durak
          </div>
        </div>
    </div>
  );
}
