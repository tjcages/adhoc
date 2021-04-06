import React, { Component } from 'react'
import { BiSearch } from "react-icons/bi"

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
      <div style="background-color: red;">
        <h3> Lets go for a <BiSearch />? </h3>
      </div>
      

//       <body class="container">
//     <div class="inner">
//         <!-- Header -->
//         <span class="indicator">
//             <span class="inner-indicator"></span>
//         </span>
//         <h1>Work</h1>
//         <button class="info-button">
//             <span class="dot"></span>
//             <span class="dot"></span>
//             <span class="dot"></span>
//         </button>
        
//         <!-- <div class="header">
//             <webview
//             class="webview"
//             style="margin: 100px;"
//             src="https://www.notion.so"
//             ></webview>
//         </div> -->
//     </div>

//     <div class="search">
//         <!-- Search Bar -->
        
//     </div>

//     <script src="./index.js"></script>
// </body>
    )
  }
}
