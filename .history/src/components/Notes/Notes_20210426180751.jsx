import React from 'react'

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
          Cheese!
        </div>
      </div>
    )
  }
}