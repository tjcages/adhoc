import React from 'react'

import { BiCheck } from 'react-icons/bi'

export default function ReplyBar() {
  return(
    <div className="reply-bar">
      <div className="reply-button">
        <h4 className="reply-button-text h4">Reply</h4>
      </div>
      <div className="reply-done">
        <BiCheck className="reply-icon"/>
      </div>
    </div>
  )
}