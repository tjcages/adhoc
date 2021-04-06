import React, { Component } from 'react'
import { Titlebar } from 'react-titlebar-osx';

const remote = require('electron').remote;

export default class App extends Component {

  constructor(props) {
    super(props)
    this.handleClose = this.handleClose.bind(this)
    this.handleMaximize = this.handleMaximize.bind(this)
    this.handleMinimize = this.handleMinimize.bind(this)
  }

  handleClose() {
    var window = remote.getCurrentWindow();
    window.close();
  }

  handleMaximize() {
    var window = remote.getCurrentWindow();
    if (!window.isMaximized()) {
        window.maximize();          
    } else {
        window.unmaximize();
    }
  }

  handleMinimize() {
    var window = remote.getCurrentWindow();
    window.minimize(); 
  }

  render() {
    return (
      <div className="App">
        <Titlebar
        text="Awesome tool"
        draggable={true}
        onClose={() => this.handleClose()}
        onMaximize={() => this.handleMaximize()}
        // onFullscreen={() => this.handleFullscreen()}
        onMinimize={() => this.handleMinimize()}
      />
  
      </div>
    )
  }
}
