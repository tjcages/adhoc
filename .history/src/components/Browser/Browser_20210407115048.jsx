import React from 'react'
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { withRouter } from "react-router-dom";

import {
    getEmailMessage,
} from "../../actions/inbox-list.actions";

import { getFormattedDate, getFromName } from '../../api/utils'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { BsPersonFill } from 'react-icons/bs'
import { AiFillStar } from 'react-icons/ai'
import { HiOutlineDotsVertical } from "react-icons/hi";

const readingTime = require('reading-time');

export class Browser extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            errorMessage: undefined,
            readingStats: {}
        };

        this.iframeRef = React.createRef();
    }

    componentDidMount(prevProps) {
        const messageId = this.props.match.params.id;
        this.props.getEmailMessage(messageId);
    }
    
    componentDidUpdate(prevProps) {
    const { emailMessageResult } = this.props;
        if (!emailMessageResult.loading) {
            if (!emailMessageResult.failed) {
                if (this.iframeRef.current) {
                    const { body } = this.iframeRef.current.contentWindow.document;
                    body.style.margin = "0px";
                    body.style.fontFamily = "Arial, Helvetica, sans-serif";
                    body.style.fontSize = "13px";
                    body.innerHTML = this.props.emailMessageResult.body;
                }
            } else {
                if (!this.state.errorMessage) {
                    this.setState({
                    errorMessage: emailMessageResult.error.result.error.message,
                    modal: true
                    });
                }
            }
        }
    }

    setReadingStats() {
        console.log("Setting reading stats: " + this.props.emailMessageResult)
        const stats = readingTime(this.props.emailMessageResult.body);
        this.setState({readingStats: stats})
    }

    renderMessage() {
        console.log('give me: ' + JSON.stringify(this.props))

        // const receivedHeader = this.props.data.payload.headers.find(el => el.name.toUpperCase() === "X-RECEIVED");
        // const date = receivedHeader ? receivedHeader.value.split(";")[1].trim() : "";
        // let formattedDate =getFormattedDate(date, {date: this.props.data.internalDate, parserFn: parseInt});
        // // const unread = this.props.data.labelIds.indexOf("UNREAD") > -1 ? " font-weight-bold" : "";
        // // let selected = this.props.data.selected ? " selected" : "";
        // const subjectHeader = this.props.data.payload.headers.find(el => el.name.toUpperCase() === "SUBJECT");
        // const subject = subjectHeader ? subjectHeader.value : "";
        // const fromHeader = this.props.data.payload.headers.find(el => el.name.toUpperCase() === "FROM");
        // let fromName = fromHeader ? getFromName(fromHeader.value) : "undefined";
        // if (this.state.readingStats !== undefined) {
        //     fromName += ' ??? ' + this.state.readingStats.text
        // }

        return (
            <div className="browser-container">
                <div className="browser-profile">
                    <div className="profile-image">
                        <BsPersonFill className="profile-icon" />
                    </div>
                </div>
                <div className="browser-content">
                    <h4 className="browser-name">
                        {/* { fromName } */}
                        Tyler
                    </h4>
                    <div className="browser-header">
                        <h2 className="browser-title">
                            {/* { subject } */}
                            Says
                        </h2>
                        <div className="browser-header-options">
                            <div className="browser-date">
                                <h4 className="date-h4">
                                    {/* { formattedDate } */}
                                    fu
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
                            frameBorder="0"
                        />
                    </div>
                </div>
                <div className="browser-">
    
                </div>
            </div>
        )
    }

    renderSpinner() {
        return (
          <div className="d-flex h-100 justify-content-center align-items-center  ">
            <FontAwesomeIcon icon={faSpinner} spin size="5x" />
          </div>
        );
      }

    renderContent() {
        if (this.props.emailMessageResult.loading) {
            return this.renderSpinner();
        } else if (this.props.emailMessageResult === undefined) {
            return (
                <div className="p-4 text-center">
                There are no messages with this label.
                </div>
            );
        }

        return this.renderMessage()
    }

    render() {        
        return this.renderContent()
    }
}

const mapStateToProps = state => ({
    emailMessageResult: state.emailMessageResult
  });
  
  const mapDispatchToProps = dispatch =>
    bindActionCreators(
      {
        getEmailMessage,
      },
      dispatch
    );
  
  export default compose(
    withRouter,
    connect(
      mapStateToProps,
      mapDispatchToProps
    )
  )(Browser);