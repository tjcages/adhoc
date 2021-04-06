import React from 'react';

import { BiSearch } from "react-icons/bi";

export default function Navigation() {
  return (
    <div className="navigation-container">
      <div className="navigation-header">
        <div className="navigation-search">
          <BiSearch />
          <h3>Search</h3>
        </div>
        <div className="navigation-filter">
          
        </div>
      </div>
      <div className="navigation-content">
        World
      </div>
    </div>
  );
}
