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
      items:[1, 2, 3, 4]
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
          <BiSearch className="notes-icon" />
          <div className="notes-options">  
            <BiBookmark className="notes-icon" />  
            <BiCalendarWeek className="notes-icon" />  
            <div className="notes-add">
              <FiEdit className="notes-add-icon" />
            </div>        
          </div>
        </div>
      </div>
    )
  }
}