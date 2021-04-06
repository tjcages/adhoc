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
            
            {/* <div class="header">
                <webview
                class="webview"
                style="margin: 100px;"
                src="https://www.notion.so"
                ></webview>
            </div> */}
        </div>

        <div class="search">
            {/* Search Bar */}
            <div class="search-content">
              <BiSearch />
              <h5>Search tabs</h5>
              <FaMicrophone />
            </div>
        </div>
    </div>
    )
  }
}
