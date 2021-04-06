import React, { useEffect, useState, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { getFormattedDate, getFromName } from '../../api/utils'

import { BsPersonFill } from 'react-icons/bs'
import { AiFillStar } from 'react-icons/ai'
import { HiOutlineDotsVertical } from "react-icons/hi";

import { getMessage } from '../../api'

export default function Browser() {
    const history = useHistory() 
    var iframeRef = useRef();

    const [formattedDate, setFormattedDate] = useState('')
    const [response, setResponse] = useState({})

    useEffect(() => {
        return history.listen((location) => { 
            const id = location.pathname.replace('/inbox/', '')
            
            getMessage(id)
            .then(response => {
                if (iframeRef.current) {
                    const { body } = iframeRef.current.contentWindow.document;
                    body.style.margin = "0px";
                    body.style.fontFamily = "Arial, Helvetica, sans-serif";
                    body.style.fontSize = "15px";
                    body.innerHTML = response.body;
                }

                setResponse(response)
                // return getHeaders(response.result)
            })
            .catch(error => {
                console.log('error loading message: ' + error.toString)
            });
        }) 
     },[history, iframeRef]) 

    function getHeaders(result) {
        const headers = result.messageHeaders

        const receivedHeader = headers.find(el => el.name.toUpperCase() === "X-RECEIVED");
        const date = receivedHeader ? receivedHeader.value.split(";")[1].trim() : "";
        let formattedDate = getFormattedDate(date, {date: this.props.data.internalDate, parserFn: parseInt});
        // const unread = this.props.data.labelIds.indexOf("UNREAD") > -1 ? " font-weight-bold" : "";
        // let selected = this.props.data.selected ? " selected" : "";
        const subjectHeader = headers.find(el => el.name.toUpperCase() === "SUBJECT");
        const subject = subjectHeader ? subjectHeader.value : "";
        const fromHeader = headers.find(el => el.name.toUpperCase() === "FROM");
        let fromName = fromHeader ? getFromName(fromHeader.value) : "undefined";

        return setFormattedDate(formattedDate)
    }

    return (
        <div className="browser-container">
            <div className="browser-profile">
                <div className="profile-image">
                    <BsPersonFill className="profile-icon" />
                </div>
            </div>
            <div className="browser-content">
                <h4 className="browser-name">
                    Jessica Lee
                </h4>
                <div className="browser-header">
                    <h1 className="browser-title">
                        Time to get inspired
                    </h1>
                    <div className="browser-header-options">
                        <div className="browser-date">
                            <h4 className="date-h4">
                                {formattedDate}
                            </h4>
                        </div>
                        <div className="browser-important">
                            <AiFillStar className="important-icon"/>
                        </div>
                        <div className="browser-options">
                            <HiOutlineDotsVertical className="options-icon"/>
                        </div>
                    </div>
                </div>
                <div className="browser-tags">
                    <div className="tag">
                        <p className="tag-title">
                        Inspiration
                        </p>
                    </div>
                    <div className="tag">
                        <p className="tag-title">
                        Design
                        </p>
                    </div>
                </div>
                <div className="browser-message">
                    <iframe
                        ref={iframeRef}
                        title="Message contents"
                        id="message-iframe"
                        frameBorder="0"
                        style={{
                            minWidth: "100%",
                            minHeight: "100vh"
                        }}
                    />
                </div>
            </div>
        </div>
    )
}
