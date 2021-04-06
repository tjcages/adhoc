import React from 'react'
import { useHistory } from 'react-router-dom'
import { BsPersonFill } from 'react-icons/bs'
import { AiFillStar } from 'react-icons/ai'
import { HiOutlineDotsVertical } from "react-icons/hi";

import { getMessage } from '../../api'

export default  class Browser extends React.Component {
    
    constructor(props) {
        super(props)

        this.iframeRef = React.createRef();

        this.renderMessage = this.renderMessage.bind(this)
    }

    componentDidMount() {
        // const messageId = this.props.match.params.id;
        // console.log('maybe: ' + messageId)
        console.log(JSON.stringify(this.props.match))
        // this.renderMessage()
    } 

    renderMessage() {
        return this.props.history.listen((location) => { 
            console.log('try me: ' + location.pathname)
            const id = location.pathname.replace('/inbox/', '')
            
            getMessage(id)
            .then(response => {
                console.log('body: ' + response.body)
                if (this.iframeRef.current) {
                    const { body } = this.iframeRef.current.contentWindow.document;
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
    }

    render() {
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
                        <iframe
                            ref={this.iframeRef}
                            title="Message contents"
                            id="message-iframe"
                            style={{
                                backgroundColor: 'red',
                                minWidth: "100%",
                                minHeight: "100vh"
                            }}
                        />
                    </div>
                </div>
            </div>
        )
    }
}
