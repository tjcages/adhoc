import React from 'react'

import { BiSearch } from "react-icons/bi";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";

export default class Sidebar extends React.Component{
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    return (
      <div className="notes-container">
        <div className="notes-main">
          Main!
        </div>
        <div className="notes-footer">
          <div className="navigation-workspace">
            <div className="navigation-workspace-icon">
              <div className="navigation-workspace-icon-outer" />
              <div className="navigation-workspace-icon-inner" />
            </div>
          </div>
          <div className="navigation-options">  
            <BiSearch className="navigation-icon" />
            <BiDotsVerticalRounded className="navigation-icon" />  
            <div className="navigation-add">
              <FiEdit className="navigation-add-icon" />
            </div>        
          </div>
        </div>
      </div>
    )
  }
}