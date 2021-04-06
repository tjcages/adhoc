import React, { useState } from 'react'
import { motion } from "framer-motion"

import { BiSearch } from "react-icons/bi"
import { FaMicrophone } from "react-icons/fa"
import { BsPlus } from "react-icons/bs"

const variants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: "-100%" },
}

function Header() {
  const [title, setTitle] = useState('')
  const [fullPage, setFullPage] = useState(false)

  function updateURL(e) {
    e.preventDefault()
    console.log(title)

    var view = document.getElementById('view');

    let https = title.slice(0, 8).toLowerCase();
    let http = title.slice(0, 7).toLowerCase();
    if (https === 'https://') {
      view.loadURL(title);
    } else if (http === 'http://') {
      view.loadURL(title);
    } else {
      view.loadURL('http://'+ title);
    }
  }

  function handleWebClick(e) {
    e.preventDefault()
    setFullPage(true)
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
              <input id="url" className="search-input" type="text" onChange={event => setTitle(event.target.value)} placeholder="Search a web page.." />
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
        <div className="web-arbox" style={{marginRight: '16px'}}>
          <webview
          className="webview"
          src="https://www.notion.so" 
          />
        </div>

        <motion.div className="web-arbox" onClick={handleWebClick} animate={fullPage ? "open" : "closed"} variants={variants} />
      </div>
    </div>
  )
}

export default Header