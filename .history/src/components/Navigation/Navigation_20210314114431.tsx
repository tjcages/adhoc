import React from 'react';
import InboxItem from './InboxItem'
import ScrollView, { ScrollElement } from "../Views/ScrollView";

import { BiSearch } from "react-icons/bi";
import { BsFilter } from "react-icons/bs";

export default function Navigation() {
  return (
    <div className="navigation-container">
      <div className="navigation-header">
        <div className="navigation-search">
          <BiSearch className="navigation-icon" />
          <h4 className="navigation-subtext">Search</h4>
        </div>
        <div className="navigation-filter">
          <BsFilter className="navigation-icon" />          
        </div>
      </div>
      <div className="navigation-content">
        <ScrollView>
          <ScrollElement>
            <InboxItem />
          </ScrollElement>

          <ScrollElement>
            <InboxItem />
          </ScrollElement>

          <ScrollElement>
            <InboxItem />
          </ScrollElement>
        </ScrollView>
      </div>
    </div>
  );
}
