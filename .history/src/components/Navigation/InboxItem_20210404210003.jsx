import React from 'react'

import { HiOutlineDotsHorizontal } from "react-icons/hi";

export default function InboxItem(props) {
    const receivedHeader = this.props.data.payload.headers.find(el => el.name.toUpperCase() === "X-RECEIVED");
    const date = receivedHeader ? receivedHeader.value.split(";")[1].trim() : "";
    let formattedDate = this.getFormattedDate(date, {date: this.props.data.internalDate, parserFn: parseInt});
    const unread = this.props.data.labelIds.indexOf("UNREAD") > -1 ? " font-weight-bold" : "";
    // let selected = this.props.data.selected ? " selected" : "";
    const subjectHeader = this.props.data.payload.headers.find(el => el.name.toUpperCase() === "SUBJECT");
    const subject = subjectHeader ? subjectHeader.value : "";
    const fromHeader = this.props.data.payload.headers.find(el => el.name.toUpperCase() === "FROM");
    let fromName = fromHeader ? this.getFromName(fromHeader.value) : "undefined";

    console.log(formattedDate)
    console.log(unread)
    console.log(subject)
    console.log(fromName)
    console.log("fuck marry kill")

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
