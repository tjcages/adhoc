import React from 'react';
import Navigation from './Navigation/Navigation'
import Browser from './Browser/Browser'

export default function Layout() {
  return (
    <div className="layout_container">
      <div className="titlebar" />
      <div className="layout-sidebar">

      </div>
      <div className="layout-navigation">
        <Navigation />
      </div>
      <div className="layout-browser">
        <Browser />
      </div>
    </div>
  );
}
