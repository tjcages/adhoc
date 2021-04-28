import React from 'react'

import NoteItem from './NoteItem'

import { BiSearch } from "react-icons/bi";
import { BiBookmark } from "react-icons/bi";
import { BiCalendarWeek } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";

export default class Notes extends React.Component{
  constructor(props) {
    super(props)

    this.state = {
      items:[1, 2, 3]
    }
  }

  render() {
    return (
      <div className="notes-container">
        <div className="notes-main">
          {this.state.items.map((item) =>
            <NoteItem />
          )}
        </div>
        <div className="notes-footer">
          <BiSearch className="navigation-icon" />
          <div className="navigation-options">  
            <BiBookmark className="navigation-icon" />  
            <BiCalendarWeek className="navigation-icon" />  
            <div className="navigation-add">
              <FiEdit className="navigation-add-icon" />
            </div>        
          </div>
        </div>
      </div>
    )
  }
}