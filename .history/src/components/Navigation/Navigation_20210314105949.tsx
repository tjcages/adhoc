import React from 'react';

import { BiSearch } from "react-icons/bi";
import { BsFilter } from "react-icons/bs";

export default function Navigation() {
  return (
    <div className="navigation-container">
      <div className="navigation-header">
        <div className="navigation-search">
          <BiSearch />
          <h4 className="navigation-subtext">Search</h4>
        </div>
        <div className="navigation-filter">
          
        </div>
      </div>
      <div className="navigation-content">
        <BsFilter />
      </div>
    </div>
  );
}
