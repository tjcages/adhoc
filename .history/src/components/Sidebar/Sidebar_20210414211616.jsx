import React from 'react'
import { Container, Button, Link } from 'react-floating-action-button'

import { RiDashboardFill } from "react-icons/ri";
import { HiMail } from "react-icons/hi";
import { IoCube } from "react-icons/io5";
import { HiInbox } from "react-icons/hi";
import { RiLogoutBoxFill } from "react-icons/ri";
import { BiMessageSquareDetail } from 'react-icons/bi'

const icons = [
  {
    icon: <BiMessageSquareDetail className="sidebar-icon" />,
    tooltip: 'Doesnt do anything yet :('
  },
  {
    icon: <RiDashboardFill className="sidebar-icon" />,
    tooltip: 'Doesnt do anything yet :('
  },
  {
    icon: <RiDashboardFill className="sidebar-icon" />,
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
            <RiLogoutBoxFill className="sidebar-icon" />
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