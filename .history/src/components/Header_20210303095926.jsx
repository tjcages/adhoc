import React from 'react'
import { BiSearch } from "react-icons/bi"
import { FaMicrophone } from "react-icons/fa"
import { BsPlus } from "react-icons/bs"

const Header = () => {
  const getTitle = async page => {
    const title = await page.evaluate(() => {
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle != null && ogTitle.content.length > 0) {
        return ogTitle.content;
      }
      const twitterTitle = document.querySelector('meta[name="twitter:title"]');
      if (twitterTitle != null && twitterTitle.content.length > 0) {
        return twitterTitle.content;
      }
      const docTitle = document.title;
      if (docTitle != null && docTitle.length > 0) {
        return docTitle;
      }
      const h1 = document.querySelector("h1").innerHTML;
      if (h1 != null && h1.length > 0) {
        return h1;
      }
      const h2 = document.querySelector("h1").innerHTML;
      if (h2 != null && h2.length > 0) {
        return h2;
      }
      return null;
    });
    return title;
  };

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
          src="https://todoist.com/app/upcoming" 
          />
        </div>

        <div class="web-arbox" style={{marginLeft: '12px'}}>
          <webview
          class="webview"
          src="https://todoist.com/app/upcoming" 
          />
        </div>
      </div>
    </div>
  )
}

export default Header;