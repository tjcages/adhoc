import React from 'react'

import { BiUser } from "react-icons/bi";
import { BiBookmark } from "react-icons/bi";
import { BiCalendarPlus } from "react-icons/bi";
import { BiCheck } from "react-icons/bi";
import { BiMessageSquareDetail } from 'react-icons/bi'

const icons = [
  {
    icon: <BiCheck className="sidebar-icon" />,
    tooltip: 'Doesnt do anything yet :('
  },
  {
    icon: <BiBookmark className="sidebar-icon" />,
    tooltip: 'Doesnt do anything yet :('
  },
  {
    icon: <BiCalendarPlus className="sidebar-icon" />,
    tooltip: 'Doesnt do anything yet :('
  },
  {
    icon: <BiMessageSquareDetail className="sidebar-icon" />,
    tooltip: 'Doesnt do anything yet :('
  },
]

export default class Sidebar extends React.Component{
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    return (
      <div className="sidebar-container">
        <div className="sidebar-main">
          <div className="sidebar-button" onClick={() => this.props.onSignout()}>
            <BiUser className="sidebar-icon" />
          </div>
        </div>
        <div className="sidebar-user">
          {  
            icons.map((icon) => 
            <div className="sidebar-button">
              { icon.icon }
            </div>
            )
          }
        </div>
      </div>
    )
  }
}