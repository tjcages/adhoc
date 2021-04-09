import React from 'react'
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { withRouter } from "react-router-dom";

import {
    getEmailMessage,
    modifyMessages
} from "../../actions/inbox-list.actions";

import { getFormattedDate, getFromName } from '../../api/utils'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { BsPersonFill } from 'react-icons/bs'
import { AiFillStar } from 'react-icons/ai'
import { HiOutlineDotsVertical } from "react-icons/hi";
import { BiMessageSquareDetail } from 'react-icons/bi'


export class Browser extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            errorMessage: undefined,
            readingStats: {}
        };

        this.iframeRef = React.createRef();

        this.renderMessage = this.renderMessage.bind(this)
        this.renderSpinner = this.renderSpinner.bind(this)
    }

    componentDidUpdate(prevProps) {
        const { emailMessageResult } = this.props;

        const result = emailMessageResult.result
        if (result !== undefined) {
            const label = emailMessageResult.result.labelIds.find((el) => el === "UNREAD")
            const id = emailMessageResult.result.id
            if (label === "UNREAD") {
                this.props.modifyMessages({ ids: [id], addLabelIds: [], removeLabelIds: ["UNREAD"] })
            }
        }

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

    renderMessage(message) {
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
            fromName += ' — ' + message.stats.text
        }

        const tags = message.labelIds

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
                        {
                            tags.map(tag => (
                                <div className={tag==="INBOX" ? "tag blue" : "tag"} key={tag}>
                                    <p className={tag==="INBOX" ? "tag-title blue" : "tag-title"}>
                                        {tag.toLowerCase().replace('category_','')}
                                    </p>
                                </div>
                            ))
                        }
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
                <div className="browser-replybutton">
                    <BiMessageSquareDetail className="reply-icon"/>
                </div>
            </div>
        )
    }

    renderSpinner() {
        return (
          <div className="browser-container d-flex justify-content-center align-items-center">
            <FontAwesomeIcon className="browser-spinner" icon={faSpinner} spin size="5x"/>
          </div>
        );
      }

    render() {       
        const currentMessageId = this.props.match.params.id
        const message = this.props.messagesResult.messages.find(el => el.id === currentMessageId)

        if (message === undefined || this.props.messagesResult.messages.length === 0 || this.props.emailMessageResult.loading) {
            return this.renderSpinner();
        } else if (this.props.emailMessageResult === undefined) {
            return (
                <div className="p-4 text-center">
                    Cannot load message :(
                </div>
            );
        }
        
        return this.renderMessage(message)
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
        modifyMessages
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