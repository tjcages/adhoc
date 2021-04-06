import React from 'react'

import { HiOutlineDotsHorizontal } from "react-icons/hi";

export default function InboxItem(props) {
    return (
        <div className={props.selected ? 'inbox-container selected' : 'inbox-container'} onClick={props.onClick}>
            <div className="inbox-image">
                
            </div>
            <div className="inbox-content">
                <h4 className="inbox-h4">Emilia Cortez</h4>
                <h5 className="inbox-h5">This is the subject of my message...</h5>
                <p className={props.selected ? 'inbox-p selected' : 'inbox-p'}>Just now</p>
            </div>
            <div className={props.selected ? 'inbox-options selected' : 'inbox-options'}>
                <HiOutlineDotsHorizontal className="inbox-icon" />
            </div>
        </div>
    )
}
