import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { BsPersonFill } from 'react-icons/bs'
import { AiFillStar } from 'react-icons/ai'
import { HiOutlineDotsVertical } from "react-icons/hi";

import { getMessage } from '../../api'

export default function Browser() {
    const history = useHistory() 
    var iframeRef = React.createRef();

    useEffect(() => {
        return history.listen((location) => { 
            const id = location.pathname.replace('/inbox/', '')
            
            getMessage(id)
            .then(response => {
                console.log('Body: ' + response.body)
                console.log('Headers: ' + JSON.stringify(response.result))
                console.log('Parts: ' + response.parts)

                if (iframeRef.current) {
                    const { body } = iframeRef.current.contentWindow.document;
                    body.style.margin = "0px";
                    body.style.fontFamily = "Arial, Helvetica, sans-serif";
                    body.style.fontSize = "13px";
                    body.innerHTML = response.body;
                }
            })
            .catch(error => {
                console.log('error loading message: ' + error.toString)
            });
        }) 
     },[history, iframeRef]) 

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
                                May 4
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
                    <h5 className="message-h5">
                    Hey David, 

                    Attached are some product photos I believe will inspire you. I really dig the colors! They are from a project called Amor ?? Mama and were designed by Asa Onze Studio.

                    Let me know what you think (though I'm pretty sure you will like them) ????????????
                    </h5>
                </div>
            </div>
        </div>
    )
}
