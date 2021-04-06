import React, { Component } from 'react'
import { ReactTinyLink } from "react-tiny-link";

import { BiSearch } from "react-icons/bi"
import { FaMicrophone } from "react-icons/fa"
import { BsPlus } from "react-icons/bs"

export default class index extends Component {
  async getTitle() {

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

          <h3>Small </h3>
          <ReactTinyLink
            cardSize="small"
            showGraphic={true}
            maxLine={2}
            minLine={1}
            url="https://www.amazon.com/Steve-Madden-Mens-Jagwar-10-5/dp/B016X44MKA/ref=lp_18637582011_1_1?srs=18637582011&ie=UTF8&qid=1550721409&sr=8-1"
          />
        </div>
      </div>
    )
  }
}
