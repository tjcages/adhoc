import React from 'react'

import { BiCheck } from 'react-icons/bi'
import { BiLabel } from 'react-icons/bi'
import { BiStar } from 'react-icons/bi'

const icons = [
  {
    icon: <BiLabel className="reply-icon green" />,
    tooltip: 'Doesnt do anything yet :('
  },
  {
    icon: <BiStar className="reply-icon yellow" />,
    tooltip: 'Doesnt do anything yet :('
  },
  {
    icon: <BiCheck className="reply-icon blue" />,
    tooltip: 'Doesnt do anything yet :('
  },
]

export default function ReplyBar() {
  return(
    <div className="reply-bar">
      <div className="reply-actions">
        <div className="reply-options">
          {
            icons.map((icon) => 
              <div className="reply-done">
                { icon.icon }
              </div>
            )
          }
        </div>
        <div className="reply-button">
          <h4 className="reply-button-text h4">Reply</h4>
        </div>
      </div>
    </div>
  )
}