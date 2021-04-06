import React, { Component } from 'react'
import { BiSearch } from "react-icons/bi"
import { FaMicrophone } from "react-icons/fa"

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
            </div>

            <div class="tabs-line">
              chode
            </div>
          </div>
        </div>

        <div class="header">
                <webview
                class="webview"
                src="https://www.notion.so"
                ></webview>
            </div>
    </div>
    )
  }
}
