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
        <div class="titlebar" />

        <div class="space-info">
            {/* Header */}
            <span class="indicator">
                <span class="inner-indicator"></span>
            </span>
            <h1>Work</h1>
            <button class="info-button">
                <span class="dot"></span>
                <span class="dot"></span>
                <span class="dot"></span>
            </button>
        </div>

        <div class="bottom-container">
          <div class="search">
              {/* Search Bar */}
              <div class="search-content">
                <button class="search-button">
                  <BiSearch class="search-icon" />
                </button>
                <h4>Search tabs</h4>
              </div>
              <button class="search-button">
                <FaMicrophone class="search-icon" />
              </button>
          </div>

          <div class="tabs">
            <div class="tabs-items">
              <h3>
                Downloads
              </h3>
              <h3>
                History
              </h3>
              <h3>
                Tabs
              </h3>
              <button class="tab-button">
                <BsPlus class="tab-icon" />
              </button>
            </div>

            <div class="tabs-line" />
          </div>
        </div>

        <div class="web-container">
          <div class="web-arbox" style={{marginRight: '12px'}}>
            <webview
            class="webview"
            src="https://www.notion.so" 
            />
          </div>

          <div class="web-arbox" style={{marginLeft: '12px'}}>
            <webview
            class="webview"
            src="https://www.notion.so" 
            />
          </div>
        </div>
      </div>
    )
  }
}
