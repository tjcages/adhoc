import React from 'react'

import { BiMessageSquareDetail } from 'react-icons/bi'

export default function ReplyBar() {
  return(
    <div className="reply-bar">
      <div className="sidebar-button">
        <BiMessageSquareDetail className="sidebar-icon" />
      </div>
    </div>
  )
}