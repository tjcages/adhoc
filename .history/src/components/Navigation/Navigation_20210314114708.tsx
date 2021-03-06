import React from 'react';
import InboxItem from './InboxItem'
import ScrollView, { ScrollElement } from "../Views/ScrollView";

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
          {data.map((item) => (
            <ScrollElement>
              <InboxItem />
            </ScrollElement>
          ))}
        </ScrollView>
      </div>
    </div>
  );
}
