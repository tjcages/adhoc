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
    icon: <RiDashboardFill />,
    tooltip: 'Create notez link'
  },
  {
    icon: <RiDashboardFill className="sidebar-icon" />,
    tooltip: 'Create notez link'
  },
  {
    icon: <RiDashboardFill className="sidebar-icon" />,
    tooltip: 'Create notez link'
  },
  {
    icon: <RiDashboardFill className="sidebar-icon" />
  },
]

export default class Sidebar extends React.Component{
  constructor(props) {
    super(props)

    this.renderButton = this.renderButton.bind(this)
  }

  renderButton() {
    return (
      <Container className="floating-action-button">
      {  
        icons.map((icon) => 
          <Link href="#"
          className="sidebar-icon"
          tooltip={icon.tooltip}
          styles={{backgroundColor: #000}}
          >
            {icon.icon}
          </Link>
        )
      }
      <Button
        className="browser-replybutton"
        tooltip="The big plus button!"
        styles={{backgroundColor: '#4E62FF', color: 'white'}}
        onClick={() => alert('FAB Rocks!')}
      >
        <BiMessageSquareDetail className="reply-icon"/>
      </Button>
      </Container>
    )
}


  render() {
    return (
      <div className="sidebar-container">
        <div className="sidebar-main">
          <div className="sidebar-button">
            <RiDashboardFill className="sidebar-icon" />
          </div>
          <div className="sidebar-button">
            <HiMail className="sidebar-icon" />
          </div>
          <div className="sidebar-button">
            <IoCube className="sidebar-icon" />
          </div>
          <div className="sidebar-button">
            <HiInbox className="sidebar-icon" />
          </div>
        </div>
        <div className="sidebar-user">
          <div className="sidebar-button" onClick={() => this.props.onSignout()}>
            <RiLogoutBoxFill className="sidebar-icon" />
          </div>
        </div>
        {
          this.renderButton()
        }
        <div className="browser-replybutton">
          <BiMessageSquareDetail className="reply-icon"/>
        </div>
      </div>
    )
  }
}