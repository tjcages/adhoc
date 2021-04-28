import React from 'react'

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

          </div>
        </div>
        <div className="sidebar-user">
          Cheese!
        </div>
      </div>
    )
  }
}