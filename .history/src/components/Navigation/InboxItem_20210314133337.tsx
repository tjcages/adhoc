import React from 'react'

import { HiOutlineDotsHorizontal } from "react-icons/hi";

export default function InboxItem() {
    return (
        <div className="inbox-container">
            <div className="inbox-image">
                
            </div>
            <div className="inbox-content">
                <h4 className="inbox-h4 noselect">Emilia Cortez</h4>
                <h5 className="inbox-h5">This is the subject of my message...</h5>
                <p className="inbox-p noselect">Just now</p>
            </div>
            <div className="inbox-options">
                <HiOutlineDotsHorizontal className="inbox-icon" />
            </div>
        </div>
    )
}
