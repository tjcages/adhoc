import React from 'react';
import Navigation from './Navigation/Navigation'
import Browser from './Navigation/Browser'

export default function Layout() {
  return (
    <div className="layout_container">
      <div className="titlebar" />
      <div className="layout_navigation">
        <Navigation />
      </div>
      <div className="layout_browser">
        <Browser />
      </div>
    </div>
  );
}
