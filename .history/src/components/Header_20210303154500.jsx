import React, { Component } from 'react'

import { BiSearch } from "react-icons/bi"
import { FaMicrophone } from "react-icons/fa"
import { BsPlus } from "react-icons/bs"

export default class index extends Component {
  onload = () => {
    const webview = document.querySelector('webview')
    const indicator = document.querySelector('.indicator')

    const loadstart = () => {
      indicator.innerText = 'loading...'
    }

    const loadstop = () => {
      indicator.innerText = ''
    }

    webview.addEventListener('did-start-loading', loadstart)
    webview.addEventListener('did-stop-loading', loadstop)
  }

  render() {
    return (
      <div id="container">
        <div className="titlebar" />

        <div className="space-info">
            {/* Header */}
            <span className="indicator">
                <span className="inner-indicator"></span>
            </span>
            <h1>Work</h1>
            <button className="info-button">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
            </button>
        </div>

        <div className="bottom-container">
          <div className="search">
              {/* Search Bar */}
              <div className="search-content">
                <button className="search-button">
                  <BiSearch className="search-icon" />
                </button>
                <h4>Search tabs</h4>
              </div>
              <button className="search-button">
                <FaMicrophone className="search-icon" />
              </button>
          </div>

          <div className="tabs">
            <div className="tabs-items">
              <h3>
                Downloads
              </h3>
              <h3>
                History
              </h3>
              <h3>
                Tabs
              </h3>
              <button className="tab-button" onClick={this.getTitle}>
                <BsPlus className="tab-icon" />
              </button>
            </div>

            <div className="tabs-line" />
          </div>
        </div>

        <div className="web-container">
          <div className="web-arbox" style={{marginRight: '12px'}}>
            <webview
            className="webview"
            src="https://www.notion.so" 
            />
          </div>

          <div className="web-arbox" style={{marginRight: '12px'}}>
            <webview
            className="webview"
            src="https://www.behance.net" 
            >
              <div className="web-cover" />
            </webview>
          </div>
        </div>
      </div>
    )
  }
}
