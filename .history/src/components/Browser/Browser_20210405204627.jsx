import React, { useEffect, useState, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { getFormattedDate, getFromName } from '../../api/utils'

import { BsPersonFill } from 'react-icons/bs'
import { AiFillStar } from 'react-icons/ai'
import { HiOutlineDotsVertical } from "react-icons/hi";

import { getMessage } from '../../api'

const readingTime = require('reading-time');

export default function Browser() {
    const history = useHistory() 
    var iframeRef = useRef();

    const [response, setResponse] = useState()
    const [readingStats, setReadingStats] = useState()

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

                const stats = readingTime(response.body);
                setReadingStats(stats)
            })
            .catch(error => {
                console.log('error loading message: ' + error.toString)
            });
        }) 
     },[history, iframeRef]) 

    const parseDate = (response) => {
        if (response !== undefined && response.result !== undefined) {
            const receivedHeader = response.result.messageHeaders.find(el => el.name.toUpperCase() === "X-RECEIVED");
            const date = receivedHeader ? receivedHeader.value.split(";")[1].trim() : "";
            let formattedDate = getFormattedDate(date, {date: response.result.internalDate, parserFn: parseInt});

            return formattedDate
        }

        return ""
    }

    const parseSubject = (response) =>{
        if (response !== undefined && response.result !== undefined) {
            const subjectHeader = response.result.messageHeaders.find(el => el.name.toUpperCase() === "SUBJECT");
            const subject = subjectHeader ? subjectHeader.value : "";

            return subject
        }

        return ""
    }

    const parseName = (response) =>{
        if (response !== undefined && response.result !== undefined) {
            const fromHeader = response.result.messageHeaders.find(el => el.name.toUpperCase() === "FROM");
            let fromName = fromHeader ? getFromName(fromHeader.value) : "undefined";

            return fromName
        }

        return ""
    }

    return (
        <div className="browser-container">
            <div className="browser-profile">
                <div className="profile-image">
                    <BsPersonFill className="profile-icon" />
                </div>
            </div>
            <div className="browser-content">
                <div className="browser-horizontal-title">
                    <h4 className="browser-name">
                        { parseName(response) + '' + readingStats.text }
                    </h4>
                </div>
                <div className="browser-header">
                    <h2 className="browser-title">
                        { parseSubject(response) }
                    </h2>
                    <div className="browser-header-options">
                        <div className="browser-date">
                            <h4 className="date-h4">
                                { parseDate(response) }
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
