import React from 'react'
import { RiDashboardFill } from "react-icons/ri";
import { HiMail } from "react-icons/hi";
import { IoCube } from "react-icons/io5";
import { HiInbox } from "react-icons/hi";
import { RiLogoutBoxFill } from "react-icons/ri";
import { BiMessageSquareDetail } from 'react-icons/bi'

export default class Sidebar extends React.Component{
  constructor(props) {
    super(props)

    this.exampleFunction = this.exampleFunction.bind(this)
  }

  exampleFunction() {

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
            <div className="browser-replybutton">
              <BiMessageSquareDetail className="reply-icon"/>
            </div>
        </div>
    )
  }
}