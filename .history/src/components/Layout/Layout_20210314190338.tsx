import React from 'react';
import Sidebar from '../Sidebar/Sidebar'
import Navigation from '../Navigation/Navigation'
import Browser from '../Browser/Browser'

export default function Layout() {
  return (
    <div className="layout_container">
      <div className="titlebar" />
      <div className="layout-sidebar">
        <Sidebar />
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
