import React, { Component } from 'react'

import { BiSearch } from "react-icons/bi"
import { FaMicrophone } from "react-icons/fa"
import { BsPlus } from "react-icons/bs"

var ById = function (id) {
  return document.getElementById(id);
}
var view = ById('view'),
    omni = ById('url');

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

  updateURL (event) {
    if (event.keyCode === 13) {
        omni.blur();
        let val = omni.value;
        let https = val.slice(0, 8).toLowerCase();
        let http = val.slice(0, 7).toLowerCase();
        if (https === 'https://') {
            view.loadURL(val);
        } else if (http === 'http://') {
            view.loadURL(val);
        } else {
        view.loadURL('http://'+ val);
        }
      }
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
            pointerEvents="box-none"
            >
              <div className="web-cover" onClick={console.log('bananas')}/>
            </webview>
          </div>
        </div>
      </div>
    )
  }
}
