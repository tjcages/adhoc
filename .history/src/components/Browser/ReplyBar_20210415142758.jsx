import React from 'react'

import { BiCheck } from 'react-icons/bi'
import { BiLabel } from 'react-icons/bi'
import { BiStar } from 'react-icons/bi'

const icons = [
  {
    icon: <BiCheck className="reply-icon" />,
    tooltip: 'Doesnt do anything yet :('
  },
  {
    icon: <BiLabel className="reply-icon" />,
    tooltip: 'Doesnt do anything yet :('
  },
  {
    icon: <BiStar className="reply-icon" />,
    tooltip: 'Doesnt do anything yet :('
  },
]

export default function ReplyBar() {
  return(
    <div className="reply-bar">
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
  )
}