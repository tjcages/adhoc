import React, { useState } from 'react';
import InboxItem from './InboxItem'

import { BiSearch } from "react-icons/bi";
import { BsFilter } from "react-icons/bs";

const data = [
  {
    image: '',
    title: '',
    subtitle: '',
    date: 'Just now'
  },
  {
    image: '',
    title: '',
    subtitle: '',
    date: 'Just now'
  },
  {
    image: '',
    title: '',
    subtitle: '',
    date: 'Just now'
  },
  {
    image: '',
    title: '',
    subtitle: '',
    date: 'Just now'
  },
]

export default function Navigation() {
  const [selectedIndex, setSelected] = useState(0);

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
      <div className="navigation-content noselect">
        {data.map((item, index) => (
          <InboxItem onClick={() => setSelected(index)} selected={selectedIndex===index}/>
        ))}
        <div className="spacer" />
      </div>
    </div>
  );
}
