import React from 'react';
import Navigation from './Navigation/Navigation'
import Home from './Navigation/Home'

export default function Layout() {
  return (
    <div className="layout_container">
        <div className="layout_navigation">
          <Navigation />
        </div>
        <div className="layout_browser">
          <Home />
        </div>
    </div>
  );
}
