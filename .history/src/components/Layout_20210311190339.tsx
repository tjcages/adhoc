import React from 'react';
import Navigation from './Navigation/Navigation'
import { ReactTinyLink } from "react-tiny-link";
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
            <ReactTinyLink
              cardSize="large"
              showGraphic={true}
              maxLine={2}
              minLine={1}
              url="https://refresh.study/"
            />
          </div>
        </div>
    </div>
  );
}
