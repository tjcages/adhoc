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

        this.setReadingStats = this.setReadingStats.bind(this)
        this.renderMessage = this.renderMessage.bind(this)
        this.renderSpinner = this.renderSpinner.bind(this)
    }

    componentDidMount(prevProps) {
        this.setReadingStats()
    }
    
    componentDidUpdate(prevProps) {
        const { emailMessageResult } = this.props;
        console.log('brow: ' + emailMessageResult.result.id)

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
        const currentMessageId = this.props.match.params.id
        const message = this.props.messagesResult.messages.find(el => el.id === currentMessageId)

        const receivedHeader = message.payload.headers.find(el => el.name.toUpperCase() === "X-RECEIVED");
        const date = receivedHeader ? receivedHeader.value.split(";")[1].trim() : "";
        let formattedDate =getFormattedDate(date, {date: message.internalDate, parserFn: parseInt});
        // const unread = message.labelIds.indexOf("UNREAD") > -1 ? " font-weight-bold" : "";
        // let selected = message.selected ? " selected" : "";
        const subjectHeader = message.payload.headers.find(el => el.name.toUpperCase() === "SUBJECT");
        const subject = subjectHeader ? subjectHeader.value : "";
        const fromHeader = message.payload.headers.find(el => el.name.toUpperCase() === "FROM");
        let fromName = fromHeader ? getFromName(fromHeader.value) : "undefined";
        if (this.state.readingStats !== undefined) {
            fromName += ' — ' + this.state.readingStats.text
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
                        { fromName }
                    </h4>
                    <div className="browser-header">
                        <h2 className="browser-title">
                            { subject }
                        </h2>
                        <div className="browser-header-options">
                            <div className="browser-date">
                                <h4 className="date-h4">
                                    { formattedDate }
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

    render() {       
        if (this.props.messagesResult.messages.length === 0 || this.props.emailMessageResult.loading) {
            return this.renderSpinner();
        } else if (this.props.emailMessageResult === undefined) {
            return (
                <div className="p-4 text-center">
                    Cannot load message :(
                </div>
            );
        }
        
        return this.renderMessage()
    }
}

const mapStateToProps = state => ({
    messagesResult: state.messagesResult,
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