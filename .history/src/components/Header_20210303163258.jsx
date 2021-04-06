import React, { useState } from 'react'

import { BiSearch } from "react-icons/bi"
import { FaMicrophone } from "react-icons/fa"
import { BsPlus } from "react-icons/bs"

var ById = function (id) {
  return document.getElementById(id);
}
var view = ById('view');

function Header() {
  const [title, setTitle] = useState('')

  function updateURL(e) {
    e.preventDefault()
    console.log(title)
        // let https = val.slice(0, 8).toLowerCase();
        // let http = val.slice(0, 7).toLowerCase();
        // if (https === 'https://') {
        //     view.loadURL(val);
        // } else if (http === 'http://') {
        //     view.loadURL(val);
        // } else {
        // view.loadURL('http://'+ val);
        // }
    }

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
            <button className="tab-button" onClick={updateURL}>
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
          id="view"
          className="webview"
          src="https://www.behance.net" 
          pointerEvents="box-none"
          >
            <div className="web-cover" onClick={console.log('bananas')}/>
          </webview>
        </div>
      </div>

      <input id="url" type="text" onChange={event => setTitle(event.target.value)} />
    </div>
  )
}

export default Header